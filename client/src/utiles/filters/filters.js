export const filterStringByProps = (list =[], words = '',listProps=[] ) =>{
    let nlist = [];
    nlist = listProps.map(
        x => {
            return x.toLowerCase();
        }
    )

    return nlist;
}