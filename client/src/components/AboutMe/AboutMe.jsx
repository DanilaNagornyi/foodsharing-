import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteSubscribe, getSubscribe } from '../../redux/AC/subscribeAC.js'
import EditUserFormModal from '../EditUserFormModal/EditUserFormModal.jsx'
import Loader from '../Loader/Loader.jsx'

const BUTTON_WRAPPER_STYLES = {
  position: 'relative',
  zIndex: 1
}

function AboutMe({ profile, setProfile }) {
  const dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState(false)
  const clickHandler = (id) => {
    setIsOpen(true)
  }
  const subList = useSelector(state => state.subscribe)

  useEffect(() => {
    dispatch(getSubscribe())
  }, [])
  const { user } = profile
  console.log('user======>', user);

  const handlerDelete = (e) => {
    dispatch(deleteSubscribe(e.target.name))
  }
  return (
    <>
      <main id="main">

        <div style={BUTTON_WRAPPER_STYLES} >
          <EditUserFormModal open={isOpen} onClose={() => setIsOpen(false)} user={user} setProfile={setProfile} />
        </div>

        {/* <!-- ======= Work Process Section ======= --> */}
        <section id="work-process" className="work-process">
            <div className="container" >
              {user ? (
                <>
                  <div className="section-title" data-aos="fade-up">
                    <h2>{user?.name} {user?.surname}</h2>
                    <p></p>
                  </div>

                  <div className="row content">
                    <div className="col-md-5" data-aos="fade-right">
                      <img src={user?.photo} className="img-fluid" alt="" />
                    </div>
                    <div className="col-md-7 pt-4" data-aos="fade-left">
                      {/* <h3>{user?.city}</h3> */}

                      <ul>
                        <li><i className="bi bi-house"></i> {user?.city}</li>
                        <li><i className="bi bi-envelope"></i> {user?.email}</li>
                        <li><i className="bi bi-phone"></i> {user?.phone}</li>
                        {user?.telegramid ?
                        // <li><i className="bi bi-telegram"></i> Telegram: @{user?.telegram}</li>
                        
                        <li><i className="bi bi-emoji-frown"></i> Подтвердите аккаунт в Telegram боте - <a href="https://t.me/FOODSHARING_FOODNINJA_BOT">Нажми на меня <i className="bi bi-telegram"></i>  </a> </li>
                        :
                        <li><i className="bi bi-telegram"></i> Telegram: @{user?.telegram}</li>
                        }
                        <li><i className="bi bi-check-circle"></i> Мои подписки:<br />
                        {subList.length ? subList.map(el => <><br /> <i className="bi bi-bell" key={el._id}></i> {el} <Link name={el} onClick={handlerDelete} > delete</Link></>) : "Нет подписок на категории"}


                        </li>
                        <br />
                        <button className="btncustom" onClick={clickHandler}>
                          Изменить личные данные
                  </button>
                 
                      </ul>
                    </div>
                  </div>
                </>)
                : <Loader />}

            </div>
        </section>
        {/* <!-- End Work Process Section --> */}

        {/* <!-- ======= Cta Section ======= --> */}
          {user?.telegramid ?
          
        <section id="cta" className="cta">
          <div className="container" data-aos="fade-in">

            <div className="text-center">
              <h3>Добавить продукт</h3>
              <p> Добавьте продукт который котите отдать людям</p>
              <Link className="cta-btn" to="/addfood">Добавить</Link>
            </div>

          </div>
        </section>
          :
          null
        }
        {/* <!-- End Cta Section --> */}
      </main>
    </>
  )
}

export default AboutMe
