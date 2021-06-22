import './Home.scss';

import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { db, firebase } from '../utils/db';
import lodash from 'lodash';
import ScholarTable from '../containers/ScholarTable';
import { Scholar, IGroup, IScholarInfo } from '../models/index';
import ScholarInput from '../components/ScholarInput';
import Account from '../components/Account';
import WithModal from '../enhancers/withModal';
import Dropdown from '../components/Dropdown';
import Statistic from '../components/Statistic';
import GroupDetail from '../components/GroupDetail';
import Header from '../components/Header';
import EmptyScholars from '../containers/EmptyScholars';
import Footer from '../components/Footer';
import { isMobile } from '../utils/misc';
import useSWR from 'swr';
import { get } from '../apis/request';
// import { useStateWithPartialSetter } from '../hooks/utils';

const AccountWithModal = WithModal(Account);
const GroupDetailWithModal = WithModal(GroupDetail);
const ScholarInputWithModal = WithModal(ScholarInput);

declare global {
  interface Window {
    propagateQueue: any;
    taskId: number;
  }
}

async function loadData(
  hashId: number,
  scholars: Scholar[],
  setScholarInfo: (a: IScholarInfo[]) => void,
): Promise<void> {
  let promiseAry = scholars.map(scholar => {
    return async () => {
      let address = scholar.walletAddress;
      const { total, last_claimed_item_at, claimable_total, } = await get<any>(`https://lunacia.skymavis.com/game-api/clients/${address}/items/1`);
      const today = new Date();
      const difference = Math.abs(today.getTime() - last_claimed_item_at * 1000) / 86400000;
      const differenceDays = Math.floor(difference) + 1;
      const averageSLP = Math.floor((total - claimable_total) / differenceDays);

      return {
        name: scholar.name,
        walletAddress: scholar.walletAddress,
        totalSLP: total,
        lastClaimed: last_claimed_item_at,
        averageSLP: averageSLP,
        days: differenceDays,
        claimedSLP: claimable_total,
        unclaimedSLP: total - claimable_total,
        scholarId: scholar.scholarId,
      }
    }
  });
  let a: IScholarInfo[] = [];
  for (const promise of promiseAry) {
    a = [...a, await promise()];
    if (window.taskId == hashId) setScholarInfo(a);
    else break;
  }
}


function Home() {
  const [cookies, setCookie] = useCookies(['user']);
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [groupId, setGroupId] = useState('');
  const [scholars, setScholars] = useState<Scholar[]>([]);
  const [toggleLogin, setToggleLogin] = useState(false);
  const [loginType, setLoginType] = useState('Login');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(cookies.user);
  const [manager, setManager] = useState('');
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [toggleGroupDetail, setToggleGroupDetail] = useState(false);
  const [toggleScholarInput, setToggleScholarInput] = useState(false);
  const [data, setData] = useState<IScholarInfo[]>([])

  const handleChangeScholars = (scholars: Scholar[]) => {
    window.taskId = Math.random();
    setScholars(scholars);
    loadData(window.taskId, scholars, setData);
  }

  const [managerDBId, setManagerDbId] = useState('');

  useEffect(() => {
    if (groupId === '-1') {
      db.collection('scholars').where('uid', '==', cookies.user ?? '').get()
      .then((querySnapShot) => {
        let ary: Scholar[] = [];
        querySnapShot.forEach((doc) => {
          ary.push({
            ...doc.data(),
            scholarId: doc.id,
          });
        });
        handleChangeScholars(ary);
      });
    } else {
      db.collection('scholars').where('uid', '==', cookies.user ?? '').where('groupId', '==', groupId).get()
      .then((querySnapShot) => {
        let ary: Scholar[] = [];
        querySnapShot.forEach((doc) => {
          ary.push({
            ...doc.data(),
            scholarId: doc.id,
          });
        });
        handleChangeScholars(ary);
      });
    }
  }, [groupId]);

  useEffect(() => {
    setIsLoggedIn(cookies.user);
    db.collection('managers').where('uid', '==', cookies.user ?? '').get()
      .then((querySnapShot) => {
        querySnapShot.forEach((doc) => {
          const manager = doc.data().name;
          const ownerGroups = !doc.data().groups ? [] : doc.data().groups;
          const totalGroup = {
            id: '-1',
            name: 'Total',
          }
          ownerGroups.push(totalGroup);
          setManagerDbId(doc.id);
          setManager(manager);
          setGroups(ownerGroups);
          setGroupId(!ownerGroups[0] ? '' : ownerGroups[0].id);
        });
      });
  }, [cookies]);

  return (
    <>
      <Header
        className="Header"
        manager={manager}
        onClickLogin={() => setToggleLogin(true)}
        onClickLogout={logOut}
      />

      <div className="Home">
        <div className="Home__title">
          <div className="Home__title__group Gilroy">
            <Dropdown
              className="Home__title__dropdown"
              items={lodash.isEmpty(groups) ? [] : groups.map((group) => group.name)}
              onChange={handleGroup}
              onClick={() => isLoggedIn ? {} : setToggleLogin(true)}
            />
            <button
              onClick={() => isLoggedIn ? setToggleGroupDetail(true) : setToggleLogin(true)}
              className="Home__title__group__button Gilroy"
            >
              +
            </button>
          </div>

          {!lodash.isEmpty(data) && <div className="Home__title__name Gilroy hidden-in-mobile">{findGroupName(groupId)}</div>}

          <button
            onClick={() => isLoggedIn ? setToggleScholarInput(true) : setToggleLogin(true)}
            className="Home__title__button Gilroy"
          >
            {!isMobile() ? '+ Add Scholar' : '+ Add'}
          </button>
        </div>

        {!lodash.isEmpty(data) && <div className="Home__title__mobile Gilroy hidden-in-desktop">{findGroupName(groupId)}</div>}

        {
          !!isLoggedIn && (
            <Statistic
              className="Home__statistic"
              scholars={scholars}
              data={data}
            />
          )
        }

        {!isLoggedIn ? (
          <EmptyScholars
            manager={manager}
          />
        ) : (
          <ScholarTable
            groupId={groupId}
            scholars={scholars}
            manager={manager}
            data={data}
            className="Home__table"
            onClickDeleteScholar={deleteScholar}
            propagateData={() => {}}
          />
        )}

        <div className="Home__spacer" />
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
            groups={groups.filter(group => group.id !== '-1')}
            manager={manager}
            uid={cookies.user}
            dbId={managerDBId}
            onClickEditGroup={onClickEditGroup}
          />
        )}

        {isLoggedIn && (
          <ScholarInputWithModal
            theme="dark"
            isVisible={toggleScholarInput}
            onClickClose={onClickCloseModal}
            groups={groups}
            addScholar={addScholar}
            baseContentClassName="Home__ScholarInputModal__baseContent"
            hideClose
          />
        )}
      </div>
      <Footer />
    </>
  );

  async function addLocalScholar(scholar: Scholar, scholarId: string) {
    const newScholars = [...scholars, {
      groupId: scholar.groupId,
      name: scholar.name,
      uid: cookies.user,
      walletAddress: scholar.walletAddress,
      scholarId: scholarId,
    }];
    setScholars(newScholars);

    let address = scholar.walletAddress;
    const { total, last_claimed_item_at, claimable_total, } = await get<any>(`https://lunacia.skymavis.com/game-api/clients/${address}/items/1`);
    const today = new Date();
    const difference = Math.abs(today.getTime() - last_claimed_item_at * 1000) / 86400000;
    const differenceDays = Math.floor(difference) + 1;
    const averageSLP = Math.floor((total - claimable_total) / differenceDays);

    const newData =  {
      name: scholar.name,
      walletAddress: scholar.walletAddress,
      totalSLP: total,
      lastClaimed: last_claimed_item_at,
      averageSLP: averageSLP,
      days: differenceDays,
      claimedSLP: claimable_total,
      unclaimedSLP: total - claimable_total,
      scholarId,
    };

    setData([...data, newData]);
  }

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

  function onClickCloseModal() {
    setToggleLogin(false);
    setToggleGroupDetail(false);
    setToggleScholarInput(false);
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
      addLocalScholar(scholar, docRef.id);
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

  function deleteScholar(deletedScholar: IScholarInfo) {
    deleteLocalScholar(deletedScholar.scholarId);

    db.collection('scholars').doc(deletedScholar.scholarId).delete().then(() => {
      console.log("Document successfully deleted!");
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  function deleteLocalScholar(scholarId: string) {
    const deletedScholars = scholars.filter((scholar) => scholar.scholarId !== scholarId);
    setScholars(deletedScholars);
    const newData = data.filter((scholar) => scholar.scholarId !== scholarId);
    setData(newData);
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
      setScholars([]);
      setGroupId('');
    }, function(error) {
      console.log(error);
    });
  }
}

export default Home;
