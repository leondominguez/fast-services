 import axios from 'axios';
 export const apiLink = 'http://localhost:3001/api/';

 export function verifyToken(token) {
   return axios.post(apiLink +'session/'+ 'verifyToken', { token }).then((res) => {
     return res.data;
    }).catch((err) => {
        console.log(err);
        }
    );
 }

 export function postSession(data) {
   return axios.post(apiLink +'session/', data).then((res) => {
    console.log("data",res.data);
     return res.data;
    }).catch((err) => {
        console.log(err);
        }
    );
 }


 export async function getJobs() {
   try {
     const res = await axios.get(apiLink + 'job/');
     return res.data;
   } catch (err) {
     console.log(err);
   }
 }

 export const getWorkersFiltered = async (jobId) => {
    try {
      
      const res = await axios.get(apiLink + 'profile?job=' + jobId);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }


  export function postRequest(input){
    return axios.post(apiLink + 'request/', input).then((res) => {
      if(res.data.msg === 'Request created'){
        alert(res.data.msg);
      }
      return res.data;
    }).catch((err) => {
        console.log(err);
        }
    );
  }


  export function getServices(){
    return axios.get(apiLink + 'request/').then((res) => {
      return res.data;
    }).catch((err) => {
        console.log(err);
        }
    );
  }


  export function putService(id, input){
    return axios.put(apiLink + 'request/' + id, input).then((res) => {
      if(res.data.msg){
        alert(res.data.msg);
      }
      return res.data;
      
    }).catch((err) => {
        console.log(err);
        }
    );
  }


  export function getUser(id){
    return axios.get(apiLink + 'profile/' + id).then((res) => {
      return res.data;
    }).catch((err) => {
        console.log(err);
        }
    );
  }


  export async function postProfile(data) {
    try {
      const res = await axios.post(apiLink + 'profile/', data);
      if (res.data.msg) {
        alert(res.data.msg);
      }
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }