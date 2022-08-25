import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

//firebase imports
import { auth } from "../firebase/firebaseInit";

const requireAuth = (to, from, next) => {
  let user = auth.currentUser;
  if (!user) {
    //redirect to login
    next({ name: "login" });
  } else {
    next();
  }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    /* ----------------------------- Home/Dashboard ----------------------------- */
    {
      path: "/",
      name: "home",
      component: HomeView,
      beforeEnter: requireAuth,
    },

    /* ------------------------------- Register------------------------------- */
    {
      path: "/register",
      name: "register",
      component: () => import("../views/Auth/RegisterView.vue"),
    },

    /* ------------------------------- Login ------------------------------- */
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Auth/LoginView.vue"),
    },

    /* ------------------------------- Forgot Password ------------------------------- */
    {
      path: "/forgot-password",
      name: "forgotPassword",
      component: () => import("../views/Auth/ForgotPasswordView.vue"),
    },

    /* ------------------------------- Procedures ------------------------------- */
    {
      path: "/procedures",
      name: "procedures",
      component: () => import("../views/Procedures/ProceduresView.vue"),
    },

    /* ---------------------------- Single Procedure ---------------------------- */
    {
      path: "/procedures/:slug",
      name: "singleProcedure",
      component: () => import("../views/Procedures/SingleProcedureView.vue"),
    },

    /* ------------------------------- Weekly Points ------------------------------- */
    {
      path: "/weekly-points-file",
      name: "weeklyPointsFile",
      component: () => import("../views/Other Escalation Files/WeeklyPointsView.vue"),
      beforeEnter: requireAuth,
    },

    /* --------------------------- Quality Escalation --------------------------- */
    {
      path: "/account-reactivate",
      name: "accountReactivate",
      component: () => import("../views/Quality Escalation Files/AccountReactivateView.vue"),
      beforeEnter: requireAuth,
    },
    {
      path: "/set-to-redeem",
      name: "seToRedeem",
      component: () => import("../views/Quality Escalation Files/SetToRedeemView.vue"),
      beforeEnter: requireAuth,
    },
    {
      path: "/sleeping-201",
      name: "sleeping201",
      component: () => import("../views/Quality Escalation Files/Sleeping201View.vue"),
      beforeEnter: requireAuth,
    },
    {
      path: "/psreason-escalated-to-quality",
      name: "psReasonEscalatedToQuality",
      component: () => import("../views/Quality Escalation Files/PsReasonEscalatedView.vue"),
      beforeEnter: requireAuth,
    },

    /* ----------------------------- Special Surveys ---------------------------- */
    {
      path: "/beverages-diary",
      name: "beveragesDiary",
      component: () => import("../views/Special Surveys Escalation Files/BeveragesView.vue"),
      beforeEnter: requireAuth,
    },
    {
      path: "/brightlabs",
      name: "brightlabs",
      component: () => import("../views/Special Surveys Escalation Files/Brightlabs.vue"),
      beforeEnter: requireAuth,
    },
    {
      path: "/etcd-diary",
      name: "etcdDiary",
      component: () => import("../views/Special Surveys Escalation Files/ETCDView.vue"),
      beforeEnter: requireAuth,
    },
    {
      path: "/tgi",
      name: "tgi",
      component: () => import("../views/Special Surveys Escalation Files/TGIView.vue"),
      beforeEnter: requireAuth,
    },

    /* ---------------------------- Survey Escalation --------------------------- */
    {
      path: "/lp-survey-escalation",
      name: "lpSurveyEscalation",
      component: () => import("../views/Survey Escalation Files/LPSurveyView.vue"),
      beforeEnter: requireAuth,
    },
    {
      path: "/ag-survey-escalation",
      name: "ag-survey-escalation",
      component: () => import("../views/Survey Escalation Files/AGSurveyView.vue"),
      beforeEnter: requireAuth,
    },

    /* ------------------------------ Social Media ------------------------------ */
    {
      path: "/site-review-tickets",
      name: "siteReviewTickets",
      component: () => import("../views/Social Escalation Files/SiteReviewView.vue"),
      beforeEnter: requireAuth,
    },
    {
      path: "/social-media-review",
      name: "socialMediaReview",
      component: () => import("../views//Social Escalation Files/SocialMediaView.vue"),
      beforeEnter: requireAuth,
    },

    /* ---------------------------- ME and Mobiworkx ---------------------------- */
    {
      path: "/me-and-mobiworkx",
      name: "meAndMobiworkx",
      component: () => import("../views/Other Escalation Files/MEandMobiworksView.vue"),
      beforeEnter: requireAuth,
    },

    /* ----------------------------- IHUT Voicemail ----------------------------- */
    {
      path: "/ihut-voicemail-log",
      name: "ihutVoicemailLog",
      component: () => import("../views/Other Escalation Files/IHUTView.vue"),
      beforeEnter: requireAuth,
    },
  ],
});

export default router;
