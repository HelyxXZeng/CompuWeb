import './navBar.scss'

const navBar = () => {
  return (
    <div className='navbar'>
      <div className='logo'>
        <img src='/logo.png' alt=''/>
        <span>Hitech Shop</span>
      </div>
      <div className='icons'>
        <img src="/search.svg" alt="" className='icon'/>
        <img src="/app.svg" alt="" className='icon'/>
        <img src="/expand.svg" alt="" className='icon'/>
        <div className='notification'>
          <img src="/notifications.svg" alt="" />
          <span>1</span>
        </div>
        <div className='user'>
          <img src="https://www.prydwen.gg/static/73f6d7fc42e7e996457057f529ad2038/60b4d/red_icon.webp" alt="" />
          <span>ADMIN</span>
        </div>
        <img src="/settings.svg" alt="" className='icon'/>
      </div>
    </div>
  )
}

export default navBar