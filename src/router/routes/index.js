import { lazy } from 'react'

// ** Document title
const TemplateTitle = '%s - InfoNow'

// ** Default Route
const DefaultRoute = '/home'


// ** Merge Routes
const Routes = [
  {
    path: '/home',
    className: 'dashboard-application',
    component: lazy(() => import('../../pages/dashboard')),
    meta: {
      accessToAdmin: true
    }
  },
  {
    path: '/profile',
    className: 'profile-application',
    component: lazy(() => import('../../pages/profile')),
    meta: {
      accessToAdmin: true
    }
  },
  {
    path: '/teachers',
    exact: true,
    className: 'teachers-application',
    component: lazy(() => import('../../pages/teachers')),
    meta: {
      accessToAdmin: true
    }
  },
  {
    path: '/teachers/:id',
    exact: true,
    className: 'teachers-application',
    component: lazy(() => import('../../pages/teachers/teacher-details')),
    meta: {
      navLink: '/teachers/:id',
      accessToAdmin: true
    }
  },

  {
    path: '/teacher-history/:teacherId',
    exact: true,
    component: lazy(() => import('../../pages/history-profile/teacher-history')),
    meta: {
      navLink: '/teacher-history/:teacherId',
      accessToAdmin: true
    }
  },

  {
    path: '/student-history/:studentId',
    exact: true,
    component: lazy(() => import('../../pages/history-profile/student-history')),
    meta: {
      navLink: '/student-history/:studentId',
      accessToAdmin: true
    }
  },


  {
    path: '/students',
    exact: true,
    className: 'students-application',
    component: lazy(() => import('../../pages/students')),
    meta: {
      accessToAdmin: true
    }
  },
  {
    path: '/students/:id',
    exact: true,
    className: 'students-application',
    component: lazy(() => import('../../pages/students/student-details')),
    meta: {
      navLink: '/students/:id',
      accessToAdmin: true
    }
  },
  {
    path: '/blog',
    exact: true,
    component: lazy(() => import('../../pages/blog/list')),
    meta: {
      accessToAdmin: true
    }
  },
  {
    path: '/blog/:id',
    exact: true,
    component: lazy(() => import('../../pages/blog/details')),
    meta: {
      navLink: '/blog/:id',
      accessToAdmin: true
    }
  },

  {
    path: '/login',
    component: lazy(() => import('../../pages/auth/login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },

  {
    path: '/forgot-password',
    component: lazy(() => import('../../pages/auth/forgot-password')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/reset-password/:token',
    component: lazy(() => import('../../pages/auth/reset-password')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true,
      navLink: '/reset-password/:token'
    }
  },
  {
    path: '/error',
    component: lazy(() => import('../../views/Error')),
    layout: 'BlankLayout'
  },
  {
    path: '/unauthorized',
    component: lazy(() => import('../../views/NotAuthorized')),
    layout: 'BlankLayout',
  },
  {
    path: '/feedback',
    component: lazy(() => import('../../pages/feedback')),
    meta: {
      accessToAdmin: true
    }
  },
]

export { DefaultRoute, TemplateTitle, Routes }
