import classes from './Avatar.module.css';
import avatarImg from './avatar.jpg';
const avatar = ()=>{
    return(
            <img 
            src={avatarImg}
            alt="Avatar" 
            className={classes.avatar}></img>
    );
}

export default avatar;