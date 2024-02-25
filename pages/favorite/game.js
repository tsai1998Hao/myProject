import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useContext,
} from 'react'
import Image from 'next/image'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { coupon_ADD } from '@/components/my-const'
import { couponUse_ADD } from '@/components/my-const'
import { useRouter } from 'next/router'
import AuthContext from '@/components/contexts/AuthContext'
import GameContext, { themes } from '@/components/contexts/GameContext'

const jumpDistance = 150 // 空白鍵的移動距離

//方向鍵換圖測試(左右已完成，缺連續動作的移動)
export default function Game() {
  const { theme, setTheme } = useContext(GameContext) //背景切換
  const [buttonImage, setButtonImage] = useState('/pics/keyboard.png') //方向鍵切換
  const [keyStates, setKeyStates] = useState({})
  const [position, setPosition] = useState({ left: 0, top: 210 })
  const [sunImageVisible, setSunImageVisible] = useState(false)
  const [cloudImageVisible, setCloudImageVisible] = useState(false)
  const [dogImageVisible, setDogImageVisible] = useState(false)
  const [randomImage1Visible, setRandomImage1Visible] = useState(false)
  const [randomImage2Visible, setRandomImage2Visible] = useState(false)
  const animationFrame = useRef(null)
  const gameContainerRef = useRef(null)
  const [gameContainer, setGameContainer] = useState('rect4')
  const [isJumping, setIsJumping] = useState(false) //跳躍狀態
  const [foodEaten, setFoodEaten] = useState(false) // 用於追蹤是否吃到食物的狀態
  const [gameStarted, setGameStarted] = useState(false) //遊戲開始才抓座標
  const router = useRouter()
  const [dogImageSrc, setDogImageSrc] = useState('/pics/dogImage.png')
  //優惠券
  const [coupondata, setCoupondata] = useState({
    hash: 'HAPPY2024',
    discount_type: '折價50元',
    expiry_date: '2024-01-27', //這欄位會與當前時間比對，大於才會變色
    coupon_status: '可使用',
  })

  const [showModal, setShowModal] = useState(false) //觸發Modal

  const { auther } = useContext(AuthContext)

  // 在组件加載时，使用 useEffect 設置 buttonImage 的初始值
  useEffect(() => {
    // 根據當前 theme 的值設置 buttonImage 的初始值
    //避免theme顏色與方向鍵圖片不一致
    if (theme.name === 'default') {
      setButtonImage('/pics/keyboard.png')
    } else if (theme.name === 'info') {
      setButtonImage('/pics/keyboard-blue.png')
    } else if (theme.name === 'secondary') {
      setButtonImage('/pics/keyboard-pink.png')
    }
  }, [theme]) // 當 theme 改變時執行 useEffect

  const modalShow = async () => {
    try {
      setShowModal(true)
      // 在點擊 "觀看優惠券" 按鈕後，發送 fetch 請求

      const requestData = {
        hash: coupondata.hash,
        discount_type: coupondata.discount_type,
        expiry_date: coupondata.expiry_date,
        coupon_status: coupondata.coupon_status,
      }

      const response = await fetch(coupon_ADD, {
        method: 'POST',
        body: JSON.stringify(requestData),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const responseData = await response.json()
        // 在這里處理 coupon 表的後端回傳数據，如果需要的话
        console.log('Coupon 資料新增成功:', responseData)

        // 同时發起 coupon_use 表的请求
        const couponUseRequestData = {
          coupon_id: responseData.couponResult.insertId,
          sid: auther.sid,
        }
        console.log(JSON.stringify(couponUseRequestData))
        const couponUseResponse = await fetch(couponUse_ADD, {
          method: 'POST',
          body: JSON.stringify(couponUseRequestData),
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + auther.token,
          },
        })

        if (couponUseResponse.ok) {
          const couponUseResponseData = await couponUseResponse.json()
          // 在這裡處理 coupon_use 表的後端回傳数據，如果需要的话
          console.log('Coupon Use 資料新增成功:', couponUseResponseData)
        } else {
          console.log('Coupon Use 資料新增失敗:', couponUseResponse.status)
        }
      } else {
        console.log('Coupon 資料新增失敗:', response.status)
      }
    } catch (error) {
      console.error('Fetch 錯誤:', error)
    }
  }
  const easeInOutQuad = (t) =>
    t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 5

  const handleJump = () => {
    const originalTop = position.top
    const jumpStartTime = performance.now()

    const jumpFrame = () => {
      const currentTime = performance.now()
      const progress = (currentTime - jumpStartTime) / 1000

      setPosition((prevPosition) => ({
        ...prevPosition,
        top: originalTop - easeInOutQuad(progress) * jumpDistance,
      }))

      if (progress < 1) {
        requestAnimationFrame(jumpFrame)
      } else {
        setPosition((prevPosition) => ({
          ...prevPosition,
          top: originalTop,
        }))
        eatFood() // 在跳躍結束後進行碰撞檢測
        setIsJumping(false)
      }
    }

    requestAnimationFrame(jumpFrame)
  }

  const handleMovement = useCallback(() => {
    setPosition((prevPosition) => {
      let { left, top } = prevPosition

      if (keyStates.ArrowRight) {
        setDogImageSrc('/pics/dogImage.png')
        left = Math.min(left + 10, 375)
      }
      if (keyStates.ArrowLeft) {
        setDogImageSrc('/pics/dogwalk.png')
        left = Math.max(left - 10, 0)
      }
      if (keyStates.ArrowUp) {
        setDogImageSrc('/pics/dogrun.png')
        left = Math.min(left + 10, 375)
        // top = Math.max(top - 10, 0)
      }
      if (keyStates.ArrowDown) {
        setDogImageSrc('/pics/dogrun2.png')
        left = Math.max(left - 10, 0)
        // top = Math.min(top + 10, 208)
      }

      if (keyStates.Space && !isJumping) {
        setIsJumping(true)
        handleJump()
      }
      // if (keyStates.ArrowDown) {
      //   top += 2
      // }
      console.log({ left, top })
      eatFood() //呼叫，不可刪除
      return { left, top }
    })
  }, [keyStates, isJumping])

  const downHandler = useCallback(
    (e) => {
      e.preventDefault()
      console.log(e.code)
      setKeyStates((prevKeyStates) => ({
        ...prevKeyStates,
        [e.code]: true,
      }))
      if (e.code === 'Space' && !isJumping) {
        setIsJumping(true)
        handleJump()
      }
    },
    [setKeyStates, setIsJumping]
  )

  const upHandler = useCallback(
    (e) => {
      e.preventDefault()
      setKeyStates((prevKeyStates) => ({
        ...prevKeyStates,
        [e.code]: false,
      }))

      if (e.code === 'Space') {
        setIsJumping(false)
      }
    },
    [setKeyStates, setIsJumping]
  )

  const move = () => {
    if (!gameStarted) {
      //遊戲開始時再抓座標
      return
    }
    handleMovement()
    animationFrame.current = requestAnimationFrame(() => move()) // 呼叫move函式
  }

  const startGame = () => {
    setSunImageVisible(true)
    setCloudImageVisible(true)
    setDogImageVisible(true)
    setRandomImage1Visible(true)
    setRandomImage2Visible(true)

    if (location.hash === '#rect4') {
      setGameContainer('rect4')
    } else {
      setGameContainer('rect3')
    }
    setGameStarted(true) // 設定遊戲已經開始
    animationFrame.current = requestAnimationFrame(move)
  }

  // 吃飼料
  const eatFood = useCallback(() => {
    const dogRect = document.querySelector('#dogImage').getBoundingClientRect()
    const randomImage1Rect = document
      .querySelector('#randomImage1')
      .getBoundingClientRect()
    const randomImage2Rect = document
      .querySelector('#randomImage2')
      .getBoundingClientRect()

    console.log('Dog Rect:', dogRect)
    console.log('Food1 Rect:', randomImage1Rect)
    console.log('Food2 Rect:', randomImage2Rect)

    if (
      (dogRect.right > randomImage1Rect.left &&
        dogRect.left < randomImage1Rect.right &&
        dogRect.bottom > randomImage1Rect.top &&
        dogRect.top < randomImage1Rect.bottom) ||
      (dogRect.right > randomImage2Rect.left &&
        dogRect.left < randomImage2Rect.right &&
        dogRect.bottom > randomImage2Rect.top &&
        dogRect.top < randomImage2Rect.bottom)
    ) {
      console.log('Dog eat the food!')
      setFoodEaten(true) // 更新 foodEaten 狀態
      setShowModal(true) // 顯示 Modal
      //modalShow()
    }
  }, [setFoodEaten, setShowModal])

  const dogMovement = useCallback(() => {
    let newTop
    setPosition((prevPosition) => {
      let { left, top } = prevPosition

      // ...其他移動邏輯

      eatFood()
      newTop = top

      return { left, top }
    })
    eatFood(newTop)
  }, [eatFood])

  useEffect(() => {
    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)

    animationFrame.current = requestAnimationFrame(() => {
      handleMovement()
    })

    return () => {
      cancelAnimationFrame(animationFrame.current)
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  }, [handleMovement])

  return (
    <div>
      <h3>簽到小遊戲</h3>
      <div className={`rect ${theme.className}`}>
        <div className="rect2">
          <div
            className={gameContainer}
            ref={gameContainerRef}
            id="gameContainer"
            style={{ position: 'relative' }}
          >
            <div>
              <Image
                src={dogImageSrc}
                alt="狗"
                id="dogImage"
                width="95"
                height="70"
                style={{
                  left: position.left,
                  top: position.top,
                  display: dogImageVisible ? 'block' : 'none',
                  position: 'absolute',
                  zIndex: 2, //狗在圖片上層
                }}
              />
            </div>
            <Image
              src="/pics/pngtree-cat-food-feed-image_2236974.png"
              alt="飼料1"
              width="60"
              height="70"
              style={{
                display: randomImage1Visible ? 'block' : 'none',
                marginLeft: '220px',
                marginTop: '80px',
                zIndex: 1,
              }}
              className="randomImage"
              id="randomImage1"
            />
            <Image
              src="/pics/dog-food.png"
              alt="飼料2"
              width="80"
              height="90"
              style={{
                display: randomImage2Visible ? 'block' : 'none',
                marginLeft: '350px',
                marginTop: '100px',
                zIndex: 1,
              }}
              className="randomImage"
              id="randomImage2"
            />
            <Image
              src="/pics/sun.png"
              alt="太陽"
              width="75"
              height="75"
              style={{
                display: sunImageVisible ? 'block' : 'none',
                marginLeft: '390px',
              }}
              id="sunImage"
            />
            <Image
              src="/pics/cloud.png"
              alt="雲朵"
              width="75"
              height="50"
              style={{
                display: cloudImageVisible ? 'block' : 'none',
                marginLeft: '80px',
              }}
              id="cloudImage"
            />
          </div>
          <span
            style={{
              marginLeft: '200px',
              marginTop: '30px',
              color: '#CA9145',
              fontSize: '22px',
            }}
          >
            佩
            <span style={{ color: '#f8723f' }}>
              佩
              <span style={{ color: '#CA9145' }}>
                星<span style={{ color: '#f8723f' }}>球</span>
              </span>
            </span>
            <Image
              src="/pics/pinkcat.png"
              alt="粉紅貓"
              width="25"
              height="25"
              id="pinkcatImage"
              style={{ cursor: 'grab' }}
              onClick={() => {
                console.log('Current Theme:', theme.name)
                if (theme.name === 'default') {
                  setTheme(themes.info)
                  console.log('Button:')
                  setButtonImage('/pics/keyboard-blue.png')
                } else if (theme.name === 'info') {
                  setTheme(themes.secondary)
                  setButtonImage('/pics/keyboard-pink.png')
                } else {
                  setTheme(themes.default)
                  setButtonImage('/pics/keyboard.png')
                }
              }}
            />
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
        >
          <Image
            src={buttonImage}
            alt="方向鍵"
            width="180"
            height="130"
            style={{
              marginTop: '10px',
            }}
            id="buttonImage"
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '20px',
            }}
          >
            <button
              className="start btn btn-outline-light btn-lg"
              onClick={startGame}
            >
              開始遊戲
            </button>
            <button className={`end ${theme.className}`}>結束</button>
          </div>
        </div>
      </div>

      {/* Modal 範例 */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header className="modal-form">
          <Modal.Title className="modal-form py-3">遊戲獎勵!!</Modal.Title>
          <Image
            src="/pics/close.png"
            alt="叉叉"
            width="40"
            height="30"
            className="mb-3"
            style={{
              cursor: 'pointer',
              position: 'absolute',
              top: '-22px',
              right: '-20px',
            }}
            onClick={() => setShowModal(false)}
          />
        </Modal.Header>
        <Modal.Body className="modal-form">
          恭喜獲得商品折價50元的優惠券~
        </Modal.Body>

        <Modal.Footer className="modal-form">
          <Button
            variant="success"
            onClick={() => {
              setShowModal(false)
              modalShow()
              router.push('/favorite/coupon2')
            }}
            className="pro-shadow" //profile.scss的屬性
          >
            觀看優惠券
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
