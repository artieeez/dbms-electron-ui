
const dbms = window.dbms


export const DebugAddonPage = () => {

  return (
    <div>
      {Object.keys(dbms?.linearSearch).map((k) => <div>{k}</div>)}
    </div>
  )
}