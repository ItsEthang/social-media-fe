import {
  Box,
  CircularProgress,
  CssBaseline,
  CssVarsProvider,
  GlobalStyles,
} from "@mui/joy";
import { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { useAppDispatch } from "./app/hooks.ts";
import AllConnections from "./components/AllConnections.tsx";
import CreatePost from "./components/CreatePost.tsx";
import FollowingConnections from "./components/FollowingConnections.tsx";
import MyProfile from "./components/MyProfile.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import { logout, updateAuth } from "./features/auth/authSlice.ts";
import Connections from "./pages/Connections.tsx";
import Posts from "./pages/Posts.tsx";
import SignIn from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";
import { AuthContextType } from "./util/types.ts";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const data: AuthContextType = JSON.parse(localStorage.getItem("user")!);

      if (data.exipreDate == undefined || Date.now() > data.exipreDate * 1000) {
        dispatch(logout());
      } else {
        dispatch(updateAuth(data));
      }
    }
    setLoading(false);
  }, []);

  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="fixed"
        top={0}
        left={0}
        width="100%"
        height="100%"
        bgcolor="rgba(255, 255, 255, 0.7)"
      >
        <CircularProgress size={"lg"} />
      </Box>
    );

  return (
    <CssVarsProvider>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ":root": {
            "--Form-maxWidth": "800px",
            "--Transition-duration": "0.4s", // set to `none` to disable transition
          },
        }}
      />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/posts" />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/create" element={<CreatePost />} />
            <Route element={<Connections />}>
              <Route path="/users/all" element={<AllConnections />} />
              <Route
                path="/users/following"
                element={<FollowingConnections />}
              />
            </Route>
            <Route path="/profile" element={<MyProfile />} />
          </Route>
        </Routes>
      </Router>
    </CssVarsProvider>
  );
}

export default App;
