const ElementOfList = ({index, el={name:'test'}, focused=false, setChatId=()=>{}}) => {
  
  let corName = [...el.name].map((el,i) => (i===0)?el.toUpperCase():el).join('');

  const changeFocused = (e) => {
    setChatId(index);
  }

  return (
    <div onClick={changeFocused} className={`element-of-list ${focused?'element-of-list-focused':''}`}>
      <div className="element-of-list-icon">{corName[0]}</div>
      <div>
        <p className="element-of-list-name">{corName}</p>
        <p>chat text...</p>
      </div>

    </div>
  )
}

export default ElementOfList;