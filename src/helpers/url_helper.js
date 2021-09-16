
export const BASE_URL = `http://192.168.10.102:3600`
export const DOCUMENT_BASE_URL = `${BASE_URL}/public`
export const MEETING_API_URL = `http://192.168.10.104:3900`
export const CHAT_API_URL = `http://192.168.10.104:3700`
export const CHAT_SOCKET_API_URL = `http://192.168.10.104:3701`
export const BLOG_API_URL = `http://192.168.10.102:1337`

// export const BASE_URL = `https://api.meditati.ro/main`
// export const DOCUMENT_BASE_URL = `${BASE_URL}/public`
// export const MEETING_API_URL = `https://meet.meditati.ro/api`
// export const CHAT_API_URL = `https://api.meditati.ro/chat`
// export const CHAT_SOCKET_API_URL = `https://api.meditati.ro/`
// export const BLOG_API_URL = `https://api.meditati.ro/blog`

export const GET_IMAGE_URL = url => url ? DOCUMENT_BASE_URL + url : DOCUMENT_BASE_URL + "/profile-pictures/default.png"
export const GET_BLOG_IMAGE_URL = url => BLOG_API_URL + url
export const GET_DOCUMENT_URL = url => DOCUMENT_BASE_URL + url


//Dashboard
export const GET_DASHBOARD_DATA = `${BASE_URL}/api/v1/admins/dashboard`
export const GET_TEACHER_HISTORY_STATS = (teacherId) => `${BASE_URL}/api/v1/admins/teacher-history-stats/${teacherId}`
export const GET_STUDENT_HISTORY_STATS = (studentId) => `${BASE_URL}/api/v1/admins/student-history-stats/${studentId}`

// admins
export const POST_STUDENT_LOGIN = `${BASE_URL}/authenticate/admin`
export const RESET_PASSWORD = `${BASE_URL}/reset-password`
export const FORGOT_PASSWORD = `${BASE_URL}/forget-password`


//Blog
export const GET_BLOG_LIST = `${BASE_URL}/api/v1/strapi/blogs`
export const GET_BLOG = id => `${BASE_URL}/api/v1/strapi/blogs/${id}`
export const GET_BLOG_CATEGORIES = `${BASE_URL}/api/v1/strapi/categories`
export const GET_BLOG_COMMENTS = id => `${BASE_URL}/api/v1/strapi/blogs/${id}/comments`
export const COMMENT_ON_BLOG = `${BASE_URL}/api/v1/strapi/comments`

export const UPLOAD_BLOG_IMAGE_URL = `${BASE_URL}/api/v1/strapi/uploads`;


//Profile
export const UPDATE_PROFILE_DATA = id => `${BASE_URL}/api/v1/admins/${id}/profile`
export const UPLOAD_PROFILE_PICTURE = id => `${BASE_URL}/api/v1/admins/${id}/profile-picture`
export const UPDATE_PASSWORD = id => `${BASE_URL}/api/v1/admins/${id}/password`

//Teacher 
export const GET_TEACHERS_STATS = `${BASE_URL}/api/v1/admins/teacher-stats`
export const GET_TEACHERS = `${BASE_URL}/api/v1/teachers`
export const TEACHER = (teacherId) => `${BASE_URL}/api/v1/teachers/${teacherId}`
export const GET_TEACHER_STUDENTS = (teacherId) => `${BASE_URL}/api/v1/teachers/${teacherId}/students`

//Student 
export const GET_STUDENTS_STATS = `${BASE_URL}/api/v1/admins/student-stats`
export const GET_STUDENTS = `${BASE_URL}/api/v1/students`
export const STUDENT = (studentId) => `${BASE_URL}/api/v1/students/${studentId}`
export const GET_STUDENTS_BY_ACTIVE_STATUS = `${BASE_URL}/api/v1/admins/students-by-status`
export const GET_STUDENTS_BY_NEW_OR_WAITING_STATUS = `${BASE_URL}/api/v1/admins/students-by-status?isActiveStudent=false`

//Assign
export const ASSIGN_UNASSIGN_TEACHER = `${BASE_URL}/api/v1/admins/assign`

//Ebooks
export const GET_EBOOKS = `${BASE_URL}/api/v1/ebooks`
export const POST_EBOOKS = `${BASE_URL}/api/v1/ebooks`