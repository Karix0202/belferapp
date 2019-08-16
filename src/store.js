import Vue from 'vue'
import Vuex from 'vuex'
import { fileURLToPath } from 'url';
import { resolveObject } from 'url';
import { all } from 'q';
const axios = require('axios');
const fs = require('fs');

const apiHost = 'http://127.0.0.1:8000/api'

function getHeaders(token) {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
}

function chooseFile(role_id) {
  switch (role_id) {
    case 2:
      return '/students.json'
  
    case 3:
      return '/tutors.json'

    case 2:
      return '/secretaries.json'
  }
}

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null,
    roles: [],
    groups: [],
    schools: [],
    userFile: localStorage.getItem('user_file_path') || '',
  },
  mutations: {
    retrieveToken(state, token) {
      state.token = token
    },
    getRoles(state, roles) {
      state.roles = roles
    },
    getGroups(state, groups) {
      state.groups = groups
    },
    getSchools(state, schools) {
      state.schools = schools
    },
    destroyToken(state) {
      state.token = null
    },
    setUserFilePath(state, path) {
      state.path = path
    }
  },
  actions: {
    retrieveToken(context, credentials) {
      return new Promise((resolve, reject) => {
        const url = 'http://127.0.0.1:8000/api/auth/login';
        axios.post(url, {
          username: credentials.username,
          password: credentials.password
        })
        .then(resp => {
          const token = resp.data.access_token;
          localStorage.setItem('access_token', token);
          context.commit('retrieveToken', token);

          resolve(resp)
        }).catch(error => {
          console.log(error.response);
          reject(error);
        });
      })     
    },
    getRoles(context) {
      return new Promise((resolve, reject) => {
        const url = 'http://127.0.0.1:8000/api/role'

        axios.get(url, {
          params: {},
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${context.state.token}`
          }
        }).then(resp => {
          context.commit('getRoles', resp.data);

          resolve(resp)
        }).catch(error => {
          console.log(error.response);
          reject(error);
        })
      });
    },
    getGroups(context) {
      return new Promise((resolve, reject) => {
        const url = 'http://127.0.0.1:8000/api/group'

        axios.get(url, {
          params: {},
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${context.state.token}`
          }
        }).then(resp => {
          context.commit('getGroups', resp.data);

          resolve(resp)
        }).catch(error => {
          console.log(error.response);
          reject(error);
        })
      });
    },
    getSchools(context) {
      return new Promise((resolve, reject) => {
        const url = 'http://127.0.0.1:8000/api/school'

        axios.get(url, {
          params: {},
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${context.state.token}`
          }
        }).then(resp => {
          context.commit('getSchools', resp.data);

          resolve(resp)
        }).catch(error => {
          console.log(error.response);
          reject(error);
        })
      })
    },
    destroyToken(context) {
      return new Promise((resolve, reject) => {
        const url = 'http://127.0.0.1:8000/api/auth/logout'

        axios.post(url, {}, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${context.state.token}`
          }
        }).then(resp => {
          localStorage.removeItem('access_token')
          context.commit('destroyToken');

          resolve(resp)
        }).catch(error => {
          console.log(error.response);
          reject(error);
        })
      })
    },
    getGroupsBySchool(context, credentials) {
      return new Promise((resolve, reject) => {
        const url = 'http://127.0.0.1:8000/api/group/school/' + credentials.id

        axios.get(url, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${context.state.token}`
          }
        }).then(resp => {
          resolve(resp)
        }).catch(error => {
          console.log(error.response);
          reject(error);
        })
      })
    },
    getSingleSchool(context, credentials) {
      return new Promise((resolve, reject) => {
        const url = 'http://127.0.0.1:8000/api/school/single/' + credentials.id

        axios.get(url, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${context.state.token}`
          }
        }).then(resp => {
          resolve(resp)
        }).catch(error => {
          console.log(error.response);
          reject(error);
        })
      })
    },
    getSingleRole(context, credentials) {
      return new Promise((resolve, reject) => {
        const url = 'http://127.0.0.1:8000/api/role/single/' + credentials.id

        axios.get(url, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${context.state.token}`
          }
        }).then(resp => {
          resolve(resp)
        }).catch(error => {
          console.log(error.response);
          reject(error);
        })
      })
    },
    createNewUser(context, credentials) {
      return new Promise((resolve, reject) => {
        const url = 'http://127.0.0.1:8000/api/user/create'

        axios.post(url, {
          username: credentials.username,
          password: credentials.password,
          role_id: credentials.role,
          school_id: credentials.school,
          group_id: credentials.group,
          first_name: credentials.first_name,
          surname: credentials.surname
        }, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${context.state.token}`
          }
        }).
        then(resp => {
          resolve(resp)
        })
        .catch(error => {
          reject(error)
        })

      });
    },
    setUserFilePath(context, credentials) {
      localStorage.setItem('user_file_path', credentials.path);
      context.commit('setUserFilePath', credentials.path);

      fs.readFile(credentials.path + '/students.json', 'utf-8', (error, data) => {
        if (error) {
          fs.writeFile(credentials.path + '/students.json', '[]', error => {});
          fs.writeFile(credentials.path + '/tutors.json', '[]', error => {});
          fs.writeFile(credentials.path + '/secretaries.json', '[]', error => {});
        }
      })
    },
    addUserToFile(context, credentials) {
      return new Promise((resolve,reject) => {
        const file = fs.readFile(context.state.userFile + chooseFile(credentials.role), 'utf-8', (error, data) => { 
        
          if (error) reject(error)
          
          const json =  JSON.parse(data)
  
          json.push({
            username: credentials.username,
            password: credentials.password,
            role_id: credentials.role,
            school_id: credentials.school,
            group_id: credentials.group,
            first_name: credentials.first_name,
            surname: credentials.surname
          })
  
          fs.writeFile(context.state.userFile + chooseFile(credentials.role), JSON.stringify(json), error, data => {
            if (error) reject(error)

            resolve(data)
          })
        })
      })
    },
    getSchoolsGroups(context, credentials) {
      return new Promise((resolve, reject) => {
        const url = 'http://127.0.0.1:8000/api/group/school/' + credentials.schoolId

        axios.get(url, {
          params: {},
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${context.state.token}`
          }
        }).then(resp => {
          resolve(resp)
        }).catch(error => {
          console.log(error.response);
          reject(error);
        })
      })
    },
    getUsersPerGroup(context, credentials) {
      return new Promise((resolve, reject) => {
        const url = apiHost + '/user/group/' + credentials.group

        axios.post(url, {
          header: getHeaders(context.state.token)
        })
        .then(resp => {
          resolve(resp)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    getSchoolsWithGroups(context, credentials) {
      return new Promise((resolve, reject) => {
        const url = apiHost + '/school/group/' + credentials.school

        axios.get(url, {
          header: getHeaders(context.state.token)
        })
        .then(resp => {
          resolve(resp)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    getTutors(context, credentials) {
      return new Promise((resolve, reject) => {
        fs.readFile(context.state.userFile + '/tutors.json', 'utf-8', (error, data) => {
          if (error) reject(error)

          const allTutors = JSON.parse(data)
          const tutors = []

          allTutors.forEach(tutor => {
            if(tutor.group_id == credentials.group) {
              tutors.push(tutor)
            }
          })

          resolve(tutors)
        })
      })
    },
    getStudents(context, credentials) {
      return new Promise((resolve, reject) => {
        const students = []

        fs.readFile(context.state.userFile + '/students.json', 'utf-8', (error, data) => {
          if (error) reject(error)

          const allStudents = JSON.parse(data)
          const students = []

          allStudents.forEach(student => {
            if (student.group_id == credentials.group) {
              students.push(student)
            }
          })

          resolve(students)
        })
      })
    },
    deleteUserFromFile(context, credentials) {
      return new Promise((resolve, reject) => {
        fs.readFile(context.state.userFile + chooseFile(credentials.user.role_id), 'utf-8', (error, data) => {
          if (error) reject(error)

          const users = JSON.parse(data)

          for(i = 0; i < length(users); i++) {
            if(users[i].id == credentials.user.id) {
              users.splice(i, 1)
            }
          }

          fs.writeFile(context.state.userFile + chooseFile(credentials.user.role_id), JSON.stringify(users), error, data => {
            if (error) reject(error)

            resolve(data)
          });
        })
      })
    },
    deleteUserFromApi(context, credentials) {
      return new Promise((resolve, reject) => {
        const url = apiHost + '/user/delete/' + credentials.user.id

        axios.post(url, {}, {
          headers: getHeaders(context.state.token)
        })
        .then(data => {resolve(data)})
        .catch(error => {reject(error)})
      })
    },
  },
  getters: {
    loggedIn(state) {
      return state.token !== null
    },
    userFile(state) {
      return state.userFile != ""
    }
  }
})
