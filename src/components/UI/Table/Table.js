import classes from './Table.module.css';

const Table = (props)=>{


    return(
        <table className={classes.table}>
            <thead>
            <tr>
                {props.headings.map(heading=>(<th key={heading}>{heading}</th>))}
            </tr>
            </thead>
            
            <tbody>
            {props.rows.map(row=>{
                
                return (
                    <tr key={row.startTime+""+row.endTime}>
                   {
                    props.cols.map((col,i)=>(
                    <td key={i}>{row[col]}</td>
                    ))
                   }
                </tr>
                )
                
            })}
            </tbody>
        </table>
    )
}

export default Table ;