import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
//common
import LandingPage from '../pages/common/LandingPage';
import Header from '../Component/common/header';
import LoginType from '../pages/common/LoginType';
import SignupType from '../pages/common/SignUpType';
import ProfType from '../pages/common/ProfileType';
//Sudarshan
import DealerProf from '../pages/udana/DealerProf';
import LoginPage from '../pages/udana/DealerLogin';
import SignupPage from '../pages/udana/DealerSignUp';
import EditProfile from '../pages/udana/editProf';
import ManageShop from '../pages/udana/ManageShop';
import Orders from '../pages/udana/Orders';
import ShopAnalysis from '../pages/udana/Analysis';
//Veenath
import InquiryCategory from '../pages/thamuditha/InquiryPages/inquiryCategory';
import FormPage from '../pages/thamuditha/InquiryPages/formPage';
import FarmerInquiry from '../pages/thamuditha/InquiryPages/farmerInquiry';
import DealerInquiry from '../pages/thamuditha/InquiryPages/dealerInquiry';
import FeedbackForm from '../pages/thamuditha/FeedbackPages/FeedbackForm';
import PastFeedbackList from '../pages/thamuditha/FeedbackPages/PastFeedbackList';
import FeedbackCardView from '../pages/thamuditha/FeedbackPages/FeedbackCardView';
import DealerRating from '../pages/thamuditha/FeedbackPages/DealerRating';
//Oshini
import LabSignUp from '../pages/vinuka/signup';
import LabLogin from '../pages/vinuka/labLogin';
import LabDash from '../pages/vinuka/labDash';
import LabProfile from '../pages/vinuka/labProfile';
import LabEdit from '../pages/vinuka/labEdit';
import TestAccept from '../pages/vinuka/accepted';
import TestComplete from '../pages/vinuka/completed';
import FileUpload from '../pages/vinuka/uploadFile';
//Lasindu
import ItemView from '../Component/udana/ItemView';
import OrderHistoryPage from '../Component/udana/orderHistory';
import UpdateOrderDialog from '../Component/udana/orderUpdate';
import ItemList from '../Component/udana/Itemlist';
//Thisaravi
import RegisterForm from '../pages/vinuka/RegisterForm';
import Profile from '../pages/vinuka/Profile';
import FarmerProfile from '../Component/vinuka/FarmerProfile';
import Sidebar from '../Component/vinuka/Sidebar';
import SoilTestRequest from '../pages/vinuka/SoilTest/SoilTestRequest';
import TestServices from '../pages/vinuka/SoilTest/TestServices';
import ViewRequests from '../pages/vinuka/SoilTest/ViewRequests';
import RequestDetails from '../pages/vinuka/SoilTest/RequestDetails';
import UpdateRequest from '../pages/vinuka/SoilTest/UpdateRequest';
import Login from '../pages/vinuka/Login';
import TestType from '../pages/vinuka/SoilTest/TestType';
import ViewResolvedRequests from '../pages/vinuka/SoilTest/ViewResolvedRequests';
import UpdateProfile from '../pages/vinuka/UpdateProfile';
//Nilupul
import ArticleList from '../pages/kande/ArticleList';
import ArticleForm from '../pages/kande/ArticleForm';
import Form from '../pages/kande/Form';
import DataTable from '../pages/kande/DataTable';
import GmailButton from '../pages/kande/GmailButton';
//Rahul
import DealerList from '../Component/thamuditha/DealerList';
import FarmerList from '../Component/thamuditha/FarmerList';
import LabCards from '../Component/thamuditha/LabCard';
import FullWidthTabs from '../Component/thamuditha/FullWidthTabs';
import AdminLogin from '../Component/thamuditha/AdminLogin';
import AdminDashboard from '../pages/thamuditha/AdminDashboard';
//Kande
import TopFertilizer from '../pages/kande/TopfertilizerScreen';
import AddTopAreas from '../pages/kande/TopAreaScreen';
import SysManagerDashboard from '../pages/kande/SysManagerDashboard';
import ViewTopFertilizer from '../pages/kande/ViewTopFertilizer';
import MLogin from '../Component/kande/login/MLogin';
import TopArea from '../pages/kande/TopAreaScreen';
import AddTopfertilizer from '../Component/kande/AddTopSelling';
import ViewTopSellers from '../pages/kande/ViewTopSelling';
import ViewTopRegisterdArea from '../pages/kande/ViewTopAreas';
import AddAdminForm from '../Component/kande/FormCntainer/Form';
import ViewAdmin from '../Component/kande/ViewAdmins';

const Router = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <>
      {isLoggedIn && <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />}

      <Routes>
        <Route path="/" element={<LandingPage isLoggedIn={isLoggedIn} />} />
        <Route
          path="/loginDealer"
          element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/signupDealer"
          element={<SignupPage setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/profileDealer"
          element={<DealerProf isLoggedIn={isLoggedIn} />}
        />
        <Route path="/editProf" element={<EditProfile />} />
        <Route path="/manageShop" element={<ManageShop />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/logintype" element={<LoginType />} />
        <Route path="/signuptype" element={<SignupType />} />
        <Route path="/profiletype" element={<ProfType />} />
        <Route path="/analysis" element={<ShopAnalysis />} />
        <Route path="/inquiryCategory" element={<InquiryCategory />} />
        <Route path="/farmerInquiry" element={<FarmerInquiry />} />
        <Route path="/dealerInquiry" element={<DealerInquiry />} />
        <Route path="/formPage" element={<FormPage />} />
        <Route path="/FeedbackForm" element={<FeedbackForm />} />
        <Route path="/FeedbackForm/:feedbackId" element={<FeedbackForm />} />
        <Route path="/PastFeedbackList" element={<PastFeedbackList />} />
        <Route path="/FeedbackCardView" element={<FeedbackCardView />} />
        <Route path="/DealerRating" element={<DealerRating />} />
        <Route path="/RegisterForm" element={<RegisterForm />} />
        <Route path="/Profile/:farmerID" element={<FarmerProfile />} />
        <Route path="/farmer/:farmerID" element={<FarmerProfile />} />
        <Route path="/Sidebar" element={<Sidebar />} />
        <Route path="/soil-test-request" element={<SoilTestRequest />} />
        <Route path="/soil-test" element={<TestServices />} />
        <Route path="/pending-requests" element={<ViewRequests />} />
        <Route path="/soil-test/:requestId" element={<RequestDetails />} />
        <Route path="/update-request/:requestId" element={<UpdateRequest />} />
        <Route
          path="/Login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/test-types" element={<TestType />} />
        <Route path="/resolved-requests" element={<ViewResolvedRequests />} />
        <Route path="/edit-profile/:farmerID" element={<UpdateProfile />} />
        <Route path="/labSignup" element={<LabSignUp />} />
        <Route
          path="/labLogin"
          element={<LabLogin setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/labDash" element={<LabDash />} />
        <Route path="/labProfile" element={<LabProfile />} />
        <Route path="/labEdit" element={<LabEdit />} />
        <Route path="/accepted" element={<TestAccept />} />
        <Route path="/completed" element={<TestComplete />} />
        <Route path="/uploadFile" element={<FileUpload />} />
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/addarticle" element={<ArticleForm />} />
        <Route path="/form" element={<Form />} />
        <Route path="/datatable" element={<DataTable />} />
        <Route path="/gmail" element={<GmailButton />} />
        <Route path="/Itemlist" element={<ItemList />} />
        <Route path="/Item/:id" element={<ItemView />} />
        <Route path="/Order-History" element={<OrderHistoryPage />} />
        <Route
          path="/update-order/:id"
          element={<UpdateOrderDialog open={true} />}
        />
        <Route path="/viewdealers" element={<DealerList />} />
        <Route path="/viewfarmers" element={<FarmerList />} />
        <Route path="/labrotaryview" element={<LabCards />} />
        <Route path="/userreports" element={<FullWidthTabs />} />
        <Route
          path="/admin/login"
          element={<AdminLogin setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/admin/home" element={<AdminDashboard />} />
        <Route path="/form" element={<Form />} />
        <Route path="/datatable" element={<DataTable />} />
        <Route path="/gmail" element={<GmailButton />} />
        <Route path="/addtopfertilizers" element={<TopFertilizer />} />
        <Route path="/viewtopfertilizers" element={<ViewTopFertilizer />} />
        <Route
          path="/addtopsellingfertilizers"
          element={<AddTopfertilizer />}
        />
        <Route path="/addtopareas" element={<AddTopAreas />} />
        <Route path="/managerdashboard" element={<SysManagerDashboard />} />
        <Route path="/MLogin" element={<MLogin />} />
        <Route path="/TopArea" element={<TopArea />} />
        <Route path="/TopSellers" element={<ViewTopSellers />} />
        <Route
          path="/ViewTopRegisterdArea"
          element={<ViewTopRegisterdArea />}
        />
        <Route path="/addadmin" element={<AddAdminForm />} />
        <Route path="/viewadmin" element={<ViewAdmin />} />
      </Routes>
    </>
  );
};

export default Router;
