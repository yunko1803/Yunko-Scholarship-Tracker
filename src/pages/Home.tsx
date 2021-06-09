import './Home.scss';

import React, { useState, useEffect } from 'react';
import { useCookies } from "react-cookie";
import { db, firebase } from '../utils/db';
import lodash from 'lodash';
import ScholarTable from '../containers/ScholarTable';
import { Scholar, IGroup } from '../models/index';
import ScholarInput from '../components/ScholarInput';
import Account from '../components/Account';
import WithModal from '../enhancers/withModal';
import Dropdown from '../components/Dropdown';
import Statistic from '../components/Statistic';
import GroupDetail from '../components/GroupDetail';
// import { useStateWithPartialSetter } from '../hooks/utils';

const AccountWithModal = WithModal(Account);
const GroupDetailWithModal = WithModal(GroupDetail);

declare global {
  interface Window { propagateQueue: any; }
}

function Home() {
  const [cookies, setCookie] = useCookies(['user']);
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [groupId, setGroupId] = useState('');
  const [data, setData] = useState<Record<string, any>>({});
  const [scholars, setScholars] = useState<Scholar[]>([]);
  const [toggleLogin, setToggleLogin] = useState(false);
  const [loginType, setLoginType] = useState('Login');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(cookies.user);
  const [manager, setManager] = useState('');
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [toggleGroupDetail, setToggleGroupDetail] = useState(false);
  // const [state, setSelected] = useStateWithPartialSetter<{}>({
  //   manager: '',
  // });
  const [managerDBId, setManagerDbId] = useState('');
  const scholarsByGroup = Object.values(data).filter(data => data.groupId === groupId);

  useEffect(() => {
    db.collection('scholars').where('uid', '==', cookies.user ?? '').where('groupId', '==', groupId).get()
      .then((querySnapShot) => {
        let ary: Scholar[] = [];
        querySnapShot.forEach((doc) => {
          ary.push({
            ...doc.data(),
            scholarId: doc.id,
          });
        });
        setScholars(ary);
      });
  }, [groupId]);

  useEffect(() => {
    setIsLoggedIn(cookies.user);
    db.collection('managers').where('uid', '==', cookies.user ?? '').get()
      .then((querySnapShot) => {
        querySnapShot.forEach((doc) => {
          const manager = doc.data().name;
          const ownerGroups = doc.data().groups;
          setManagerDbId(doc.id);
          setManager(manager);
          setGroups(ownerGroups);
          setGroupId(ownerGroups[0].id);
        });
      });
  }, [cookies])

  return (
    <div className="Home">
      {
        !manager ? null :
        <div className="Home__account">
          <span>Welcome {manager}!</span>
          <div
            className="Home__account__logout"
            onClick={logOut}
          >
            Log Out
          </div>
        </div>
      }
      <ScholarInput
        groups={groups}
        addScholar={addScholar}
        onClickLogin={onClickOpenModal}
      />

      {/* <Tabs
        className="Home__Tabs"
        contents={groups}
        onSelect={setGroup}
      /> */}

      <div className="Home__title">
        <Dropdown
          className="Home__title__dropdown"
          items={lodash.isEmpty(groups) ? [] : groups.map((group) => group.name)}
          onChange={handleGroup}
        />
        <h1 className="Home__title__h1">group {findGroupName(groupId)}</h1>
        {isLoggedIn && (
          <button
            onClick={() => setToggleGroupDetail(true)}
            className="Home__title__button"
          >
            Add Group
          </button>
        )}
      </div>

      <Statistic
        className="Home__statistic"
        scholars={scholarsByGroup}
      />

      <ScholarTable
        groupId={groupId}
        scholars={scholars}
        onClickDeleteScholar={deleteScholar}
        propagateData={propagateData}
      />

      {!isLoggedIn && (
        <AccountWithModal
          theme="dark"
          isVisible={toggleLogin}
          onClickClose={onClickCloseModal}
          loginType={loginType}
          onClickLoginType={setLoginType}
          login={login}
          register={register}
          error={errorMessage}
          onClickResetError={() => setErrorMessage('')}
          isLoginLoading={isLoginLoading}
          onClickLoginLoading={() => setIsLoginLoading(true)}
        />
      )}

      {isLoggedIn && (
        <GroupDetailWithModal
          theme="dark"
          isVisible={toggleGroupDetail}
          onClickClose={onClickCloseModal}
          groups={groups}
          manager={manager}
          uid={cookies.user}
          dbId={managerDBId}
          onClickEditGroup={onClickEditGroup}
        />
      )}
    </div>
  );

  function onClickEditGroup(newGroups: IGroup[]) {
    setGroups(newGroups);
  }

  function handleGroup(groupName: string) {
    const selectedGroup = lodash.find(groups, (group) => group.name === groupName);
    setGroupId(selectedGroup!.id);
  }

  function findGroupName(groupId: string) {
    if (lodash.isEmpty(groups) || !groupId) return '';

    const selectedGroup = groups.filter(group => group.id === groupId);
    return selectedGroup[0].name;
  }

  function propagateData(scholarData: any) {
    setData({ ...data, ...window.propagateQueue });
    // window.propagateQueue = {};
  }

  function onClickCloseModal() {
    setToggleLogin(false);
    setToggleGroupDetail(false);
  }

  function onClickOpenModal() {
    setToggleLogin(true);
  }

  function addScholar(scholar: Scholar) {
    db.collection('scholars').add({
      groupId: scholar.groupId,
      name: scholar.name,
      uid: cookies.user,
      walletAddress: scholar.walletAddress,
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      const newScholars = [...scholars, {
        groupId: scholar.groupId,
        name: scholar.name,
        uid: cookies.user,
        walletAddress: scholar.walletAddress,
        scholarId: docRef.id,
      }];
      setScholars(newScholars);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  function handleCookie(uid: string) {
    setCookie("user", uid, {
      path: "/"
    });
  }

  function deleteScholar(deletedScholar: Scholar) {
    const deletedScholars = scholars.filter((scholar) => scholar.scholarId !== deletedScholar.scholarId);
    setScholars(deletedScholars);
    db.collection('scholars').doc(deletedScholar.scholarId).delete().then(() => {
      console.log("Document successfully deleted!");
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  function login(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email,password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        handleCookie(user!.uid);
        setToggleLogin(false);
        setIsLoginLoading(false);
        setErrorMessage('');
        // ...
      })
      .catch(error => {
        console.log(error.message);
        setErrorMessage(error.message);
        setIsLoginLoading(false);
    })
  }

  function register(email: string, password: string, name: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        setToggleLogin(false);
        setIsLoginLoading(false);
        setErrorMessage('');
        // Signed in
        var user = userCredential.user;
        handleCookie(user!.uid);
        db.collection('managers').add({
          name,
          uid: user!.uid,
        })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
      })
      .catch(error => {
        console.log(error.message);
        setErrorMessage(error.message);
        setIsLoginLoading(false);
    });
  }

  function logOut() {
    firebase.auth().signOut().then(function() {
      console.log('successfully logged out');
      setManager('');
      setIsLoggedIn(false);
      handleCookie('');
      setGroups([]);
      setData({});
      setScholars([]);
      setGroupId('');
    }, function(error) {
      console.log(error);
    });
  }
}

export default Home;
