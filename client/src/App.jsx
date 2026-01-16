import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home.jsx'
import BlogPage from './pages/BlogPage.jsx'
import Layout from './pages/admin/Layout.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import AddBlog from './pages/admin/AddBlog.jsx'
import Journal from './pages/admin/Journal.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import AiTherapist from './pages/admin/AiTherapist.jsx'
import MoodCheck from './pages/admin/MoodCheck.jsx'
import Habit from './pages/admin/Habit.jsx'
import 'quill/dist/quill.snow.css'
import Insight from './pages/Insight.jsx'
import ProtectedRoute from './config/ProtectedRoute.jsx'
import Loader from './components/Loader.jsx'
import useAuthUser from './hooks/useAuthUser.js'
import StressForm from './pages/admin/StressForm.jsx'
import StressHistory from './pages/admin/StressHistory.jsx'

const App = () => {

  const {isLoading, authUser} = useAuthUser();

  if(isLoading)    return <Loader />

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/blogs' element={<BlogPage />} />
        <Route path="/blogs/:id" element={<Insight />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route element={
          <ProtectedRoute authUser={authUser} isLoading={isLoading} />
        }>
          <Route path="/dashboard" element={<Layout />} >
            <Route index element={<Dashboard />} />
            <Route path="mood" element={<MoodCheck />} />
            <Route path="stress-form" element={<StressForm />} />
            <Route path="stress-history" element={<StressHistory />} />
            <Route path="add-blog" element={<AddBlog />} />
            <Route path="journal" element={<Journal />} />
            <Route path="ai-therapist" element={<AiTherapist />} />
            <Route path="habit" element={<Habit />} />
          </Route>  
        </Route>
      </Routes>
    </div>
  )
}

export default App