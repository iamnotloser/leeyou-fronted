import myaxios from "../plugins/my-axios.ts";
import {setCurrentUserState} from "../states/user.ts";


export const getCurrentUser = async ()=>{
    // const currentUser = getCurrentUserState();
    // if(currentUser){
    //     return currentUser;
    //
    // }
    //不存在则远程获取
    const res = await myaxios.get('/user/current');
    if(res.code === 0){
        setCurrentUserState(res.data);
        return res.data;
    }
    return null;


}

