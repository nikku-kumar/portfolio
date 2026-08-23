const API_URL=import.meta.env.VITE_API_URL||'http://localhost:8080/api';
async function request(path,options){const response=await fetch(`${API_URL}${path}`,options);const data=await response.json().catch(()=>({}));if(!response.ok)throw new Error(data.message||'Unable to reach the portfolio API.');return data;}
export const getPortfolio=()=>Promise.all(['/profile','/skills','/experience','/projects','/education'].map(path=>request(path))).then(([profile,skills,experience,projects,education])=>({profile,skills,experience,projects,education}));
export const sendContact=(form)=>request('/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)});
