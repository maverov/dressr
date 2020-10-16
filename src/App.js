import React, { useState, useEffect } from "react";
import "./App.css";
import logo from "./logo.png";
import Post from "./Post";
import Footer from "./Footer";
import { db, auth, storage } from "./firebase";
import { makeStyles } from "@material-ui/core/styles";
import ImageUpload from "./ImageUpload"
import Modal from "@material-ui/core/Modal";
import { Button, Input } from "@material-ui/core";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if (authUser) {
          // user has logged in
          console.log(authUser);
          setUser(authUser);
          
        } else {
          // user has logged out
          setUser(null)
        }
      })

      return () => {
        unsubscribe();
      }
  }, [user, username])

  // useEffect -> runs the code bellow based on a specific condition
  useEffect(() => {
    db.collection("posts").orderBy("timestamp", "desc").onSnapshot((snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, []); // <- the condition []
  // [] means whatever the code is here -> run the function once and that's it

  const signUp = (e) => {
    e.preventDefault();

    auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((err) => alert(err.message))

    setOpen(false);
  };

  const signIn = (e) => {
    e.preventDefault();

    auth
    .signInWithEmailAndPassword(email, password)
    .catch(err => alert(err.message))

    setOpenSignIn(false);
  };

  return (
    <div className="app">
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form action="" className="app__signup">
            <img
              className="app__headerImage app_signinlogo"
              src={logo}
              alt="Dressr Logo"
            />
            <Input
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Password"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              password
            />
            <Button type="submit" onClick={signUp}>
              Sign Up
            </Button>
          </form>
        </div>
      </Modal>

      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form action="" className="app__signup">
            <img
              className="app__headerImage app_signinlogo"
              src={logo}
              alt="Dressr Logo"
            />
        
            <Input
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Password"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              password
            />
            <Button type="submit" onClick={signIn}>
              Sign Up
            </Button>
          </form>
        </div>
      </Modal>

      <div className="app__header">
        <img className="app__headerImage" src={logo} alt="Dressr Logo" />
        { user ? (

            <Button onClick={() => auth.signOut()}>Logout</Button>

        
      ) : (
        <div style={{marginTop: "10px"}}>
        <Button onClick={() => setOpenSignIn(true)}>Login</Button>
          <Button onClick={() => setOpen(true)}>Sign Up</Button>
        </div>
      )}
      </div>

      
      
      
      {/* Header */}
 
      <div className="app__posts">
        <div className="app__postsLeft">
        {posts.map(({ id, post }) => (
          <Post
            key={id}
            postId={id}
            user={user}
            username={post.username}
            caption={post.caption}
            imageUrl={post.imageUrl}
          />
        ))}
        </div>
        
        
        
      </div>
      

      { user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <h3>Sorry you need to be logged in to upload files</h3>
      )}

      <Footer />
    </div>
  );
}

export default App;
