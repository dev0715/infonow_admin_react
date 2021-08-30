import { post, del, get, put, postForm } from "./api_helper"
import * as  url from "./url_helper"




// Gets the logged in user data from local session
export const getLoggedInUser = () => {
  const user = localStorage.getItem("authUser")
  return user ? JSON.parse(user) : null;
}

export const setLoggedInUser = (obj = {}) => {
  localStorage.setItem("authUser", JSON.stringify(obj))
}

export const getAuthentication = () => {
  const tokenInfo = localStorage.getItem("authToken")
  return tokenInfo ? JSON.parse(tokenInfo) : null;
}

//is user is logged in
export const isUserAuthenticated = () => {
  return getAuthentication() !== null
}


//Dashboard
export const getDashboardData = () => get(url.GET_DASHBOARD_DATA)


//Blogs 
export const getBlogList = () => get(url.GET_BLOG_LIST)
export const getBlog = (id) => get(url.GET_BLOG(id))
export const getBlogCategories = () => get(url.GET_BLOG_CATEGORIES)
export const getBlogComments = (id) => get(url.GET_BLOG_COMMENTS(id))
export const postCommentOnBlog = (data) => post(url.COMMENT_ON_BLOG, data)


export const uploadBlogImage = (data, options) => postForm(url.UPLOAD_BLOG_IMAGE_URL, data, options);

// Admin Actions
export const postStudentLogin = data => post(url.POST_STUDENT_LOGIN, data);
export const forgotAccountPassword = data => post(url.FORGOT_PASSWORD, data);
export const resetAccountPassword = data => post(url.RESET_PASSWORD, data);


//Profile

export const updateProfileData = (id, data) => put(url.UPDATE_PROFILE_DATA(id), data);
export const uploadProfilePicture = (id, data) => postForm(url.UPLOAD_PROFILE_PICTURE(id), data);
export const updatePassword = (id, data) => put(url.UPDATE_PASSWORD(id), data);

//Teacher 
export const getTeachers = (adminId) => get(url.TEACHERS(adminId))
export const getTeacher = (teacherId) => get(url.TEACHER(teacherId))

//Student 
export const getStudents = (adminId) => get(url.STUDENTS(adminId))
export const getStudent = (studentId) => get(url.STUDENT(studentId))