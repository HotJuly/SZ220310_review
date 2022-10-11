import { login, logout, getInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter, constantRoutes, asyncRoutes, anyRoutes } from "@/router";
import router from "@/router";
import {cloneDeep} from 'lodash';

function filterAsyncRoutes(asyncRoutes, routeNames) {
  /*
    目的:
      使用完整的异步路由数组+当前账号能访问的路由名称
      过滤得到一个当前账号能访问的异步路由组成的数组

    返回值数据类型:数组
    数组里面存放的是什么东西?
      存放路由对象

      filter方法,返回值是原数组中的数据,我们通过该方法只会修改个数,返回新的数组
        不会修改内部的内容
  */
  const newAsyncRoutes = asyncRoutes.filter((routeObj) => {
    const name = routeObj.name;

    // 如果有子路由,那么就对子路由进行过滤操作,将最后过滤的结果放回children属性中
    if(routeObj.children&&routeObj.children.length){

      routeObj.children = filterAsyncRoutes(routeObj.children,routeNames)

    }

    return routeNames.includes(name);
  });

  // console.log('newAsyncRoutes',newAsyncRoutes)
  return newAsyncRoutes;
}

const getDefaultState = () => {
  return {
    token: getToken(),
    name: "",
    avatar: "",

    // 用于存储用户账号相关的按钮权限信息
    buttons: [],

    // 用于存储当前项目能访问的所有路由对象,目的是为了解决左侧导航栏的错误显示
    routes:[],

    // 用于存储用户帐号相关的路由权限信息
    routeNames: [],
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_PERMISSION: (state, data) => {
    // console.log('data',data)
    const { buttons, routes } = data;

    state.buttons = buttons;
    state.routeNames = routes;

    // 使用完整的异步路由数组+当前账号能访问的路由名称
    // 过滤得到一个当前账号能访问的异步路由组成的数组
    const newAsyncRoutes = filterAsyncRoutes(cloneDeep(asyncRoutes), state.routeNames);

    router.addRoutes([...newAsyncRoutes,...anyRoutes]);
    // newAsyncRoutes.forEach((route)=>{
    //   router.addRoutes(route)
    // })

    state.routes = constantRoutes.concat(newAsyncRoutes,anyRoutes);
  },
};

const actions = {
  // user login
  // login({ commit }, userInfo) {
  //   const { username, password } = userInfo
  //   return new Promise((resolve, reject) => {
  //     login({ username: username.trim(), password: password })
  //     .then(response => {
  //       const { data } = response
  //       commit('SET_TOKEN', data.token)
  //       setToken(data.token)
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  async login({ commit }, userInfo) {
    const { username, password } = userInfo;
    try {
      const response = await login({
        username: username.trim(),
        password: password,
      });
      const { data } = response;
      // 将请求回来的token存入Vuex的state中(相当于存储于内存中)
      commit("SET_TOKEN", data.token);
      // 将请求回来的token存入cookie中(相当于存储于硬盘中)
      // cookie相对localStorage的好处:每次发送请求会自动携带该token
      setToken(data.token);
    } catch (error) {
      console.log("error");
    }
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then((response) => {
          const { data } = response;

          if (!data) {
            return reject("Verification failed, please Login again.");
          }

          const { name, avatar } = data;

          commit("SET_NAME", name);
          commit("SET_AVATAR", avatar);
          commit("SET_PERMISSION", data);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          removeToken(); // must remove  token  first
          resetRouter();
          commit("RESET_STATE");
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken(); // must remove  token  first
      commit("RESET_STATE");
      resolve();
    });
  },
};

export default {
  // 开启命名空间,相当于是对所有的state,action,mutation进行模块化管理(类似作用域)
  //  dispatch('user/login')
  namespaced: true,
  state,
  mutations,
  actions,
};
