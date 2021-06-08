import './Home.scss';

import React, { useState, useEffect } from 'react';
import { useCookies } from "react-cookie";
import { db, firebase } from '../utils/db';
import ScholarTable from '../containers/ScholarTable';
import { Scholar } from '../models/index';
import ScholarInput from '../components/ScholarInput';
import Account from '../components/Account';
import WithModal from '../enhancers/withModal';
import Dropdown from '../components/Dropdown';
import Statistic from '../components/Statistic';

const AccountWithModal = WithModal(Account);

declare global {
  interface Window { propagateQueue: any; }
}

function Home() {
  const [cookies, setCookie] = useCookies(['user']);
  const [groups, setGroups] = useState([]);
  const [group, setGroup] = useState('');
  const [data, setData] = useState<Record<string, any>>({});
  const [scholars, setScholars] = useState<Scholar[]>([]);
  const [toggleLogin, setToggleLogin] = useState(false);
  const [loginType, setLoginType] = useState('Login');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(cookies.user);
  const [manager, setManager] = useState('');
  const scholarsByGroup = Object.values(data).filter(data => data.group === group);
  console.log(manager);

  useEffect(() => {
    //supposed to be uid
    db.collection('managers').where('uid', '==', cookies.user ?? '').get()
      .then((querySnapShot) => {
        querySnapShot.forEach((doc) => {
          const manager = doc.data().name;
          setManager(manager);
        });
      });

    db.collection('groups').where('uid', '==', cookies.user ?? '').get()
      .then((querySnapShot) => {
        querySnapShot.forEach((doc) => {
          const ownerGroups = doc.data().groups;
          setGroups(ownerGroups);
          setGroup(ownerGroups[0]);
        });
      });
  }, []);

  useEffect(() => {
    db.collection('scholars').where('uid', '==', cookies.user ?? '').where('group', '==', group).get()
      .then((querySnapShot) => {
        let ary: Scholar[] = [];
        querySnapShot.forEach((doc) => {
          ary.push({
            ...doc.data(),
            scholarId: doc.id,
          });
        });
        setScholars(ary);
      })
  }, [group]);

  useEffect(() => {
    setIsLoggedIn(cookies.user);
    db.collection('managers').where('uid', '==', cookies.user ?? '').get()
      .then((querySnapShot) => {
        querySnapShot.forEach((doc) => {
          const manager = doc.data().name;
          setManager(manager);
        });
      });
    db.collection('groups').where('uid', '==', cookies.user ?? '').get()
      .then((querySnapShot) => {
        querySnapShot.forEach((doc) => {
          const ownerGroups = doc.data().groups;
          setGroups(ownerGroups);
          setGroup(ownerGroups[0]);
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
          items={groups}
          onChange={setGroup}
        />
        <h1 className="Home__title__h1">group {group}</h1>
      </div>

      <Statistic
        className="Home__statistic"
        scholars={scholarsByGroup}
      />

      <ScholarTable
        group={group}
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
        />
      )}
    </div>
  );

  function propagateData(scholarData: any) {
    setData({ ...data, ...window.propagateQueue });
    // window.propagateQueue = {};
  }

  function onClickCloseModal() {
    setToggleLogin(false);
  }

  function onClickOpenModal() {
    setToggleLogin(true);
  }

  function addScholar(scholar: Scholar) {
    db.collection('scholars').add({
      group: scholar.group,
      name: scholar.name,
      uid: cookies.user,
      walletAddress: scholar.walletAddress,
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      scholars.push({
        ...scholar,
        scholarId: docRef.id,
      })
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
        // ...
      })
      .catch(error => {
        console.log(error.message);
        setErrorMessage(error.message);
    })
  }

  function register(email: string, password: string, name: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        setToggleLogin(false);
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
    }, function(error) {
      console.log(error);
    });
  }
}

export default Home;
