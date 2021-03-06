import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";
import AddPost from "./module/post/AddPost";
import DashboardLayout from "./module/dashboard/DashboardLayout";
import PostManage from "./module/post/PostManage";
import DashboardPage from "./pages/DashboardPage";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import Error404Page from "./pages/Error404Page";
import CategoryManage from "./module/category/CategoryManage";
import AddCategory from "./module/category/AddCategory";
import UserProfile from "./module/user/UserProfile";
import UserManage from "./module/user/UserManage";
import UpdateCategory from "./module/category/UpdateCategory";
function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
          <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
          <Route path="/*" element={<Error404Page></Error404Page>}></Route>
          <Route element={<DashboardLayout></DashboardLayout>}>
            <Route
              path="/dashboard"
              element={<DashboardPage></DashboardPage>}
            ></Route>
            <Route
              path="/manage/post"
              element={<PostManage></PostManage>}
            ></Route>
            <Route
              path="/manage/add-post"
              element={<AddPost></AddPost>}
            ></Route>
            <Route
              path="/manage/category"
              element={<CategoryManage></CategoryManage>}
            ></Route>
            <Route
              path="/manage/add-category"
              element={<AddCategory></AddCategory>}
            ></Route>{" "}
            <Route
              path="/manage/update-category"
              element={<UpdateCategory></UpdateCategory>}
            ></Route>{" "}
            <Route
              path="/manage/user"
              element={<UserManage></UserManage>}
            ></Route>
            <Route
              path="/manage/user-profile"
              element={<UserProfile></UserProfile>}
            ></Route>
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
