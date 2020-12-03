import Avatar from '../Avatar/Avatar'
import classes from  '../Header/Header.module.css';
const header = ()=>{
    return(
    <div className={classes.header}>
        <Avatar />
        <h5 >Welcome Amrish</h5>
    </div>
    )
}

export default header ;