import { useEffect, useState } from 'react'
import axios from 'axios'
import { CiForkAndKnife } from 'react-icons/ci'
import { MdPets } from 'react-icons/md'
import { FaPoo } from 'react-icons/fa6'
import { FaBath } from 'react-icons/fa'
import { FaSyringe } from 'react-icons/fa'
import styles from '@/css/todayadd.module.css'
import toast, { Toaster } from 'react-hot-toast'
import Image from 'next/image'

import { useRouter } from 'next/router'

import VerticalNavBar from '@/pages/diary/vertical-nav-bar'
import Link from 'next/link'
import DiaryForm from './diary-add-switch-form'

export default function Home() {
  const router = useRouter()
  const [cate, setCate] = useState('food')
  const [pet_id, setPetId] = useState(1)
  const [pet, setPet] = useState({
    pet_owner_id: 0,
    pet_name: '',
    pet_type: '狗', // FIXME: hard code
    pet_breed: '',
    pet_birthday: '',
    pet_chip_id: '',
    pet_gender: '',
    pet_height: '',
    pet_weight: '',
  })
  const [diary, setDiary] = useState({
    diary_pet_id: null,
    diary_act_name: undefined,
    diary_date: undefined,
    diary_date_time: undefined,
    diary_quantity_g: undefined,
    diary_duration_min: undefined,
    diary_body_temperature: undefined,
    diary_height_cm: undefined,
    diary_weight_kg: undefined,
    diary_memo: undefined,
  })

  //取寵物資料
  const getPetData = async (pet_id) => {
    const res = await axios.get(
      `http://localhost:3002/diary/pet/list/${pet_id}`
    )

    if (res.data.status === 'success') {
      // 設定獲取項目
      setPet(res.data.data.pet)
    }
  }

  // 輸入欄位用
  const handleFieldChange = (e) => {
    setDiary({ ...diary, [e.target.name]: e.target.value })
  }

  const handleCategoryChange = async (e) => {
    if (e.target.id) {
      setCate(e.target.id)
    } else {
      setCate(e.target.nearestViewportElement.id)
    }
  }

  const handleSubmit = async (e) => {
    // 阻擋表單預設送出行為
    e.preventDefault()

    const res = await axios.post('http://localhost:3002/diary/today/add', diary)

    if (res.data.status === 'success') {
      toast.success('資訊 - 寵物日記新增成功')
    } else {
      toast.error(`錯誤 - 寵物日記新增失敗`)
    }

    setTimeout(() => {
      router.push(`/diary/today?pet_id=${pet_id}`)
    }, 2000)
  }

  useEffect(() => {
    if (router.isReady) {
      // 從router.query得到所有查詢字串參數
      const { pet_id } = router.query

      // 載入資料
      getPetData(pet_id)
      setPetId(pet_id)
      setDiary({ ...diary, diary_pet_id: pet_id })
    }
  }, [router.query, router.isReady])

  return (
    <>
      <main className={styles.main}>
        {/* 左邊欄位 */}
        <VerticalNavBar
          focused="diary"
          pet_name={pet.pet_name}
          pet_pic={pet.pet_avatar} />
        {/* 左邊欄位 */}
        {/* 右上標題 */}
        <div className={styles.myBody}>
          <div className={styles.mypetList}></div>
          {/* 右上標題 */}
          {/* 中間卡片 */}
          <div className={styles.myBody1}>
            <div className={styles.myBodylist}>
              <div
                className="col-sm-7 border border-primary rounded-5"
                style={{ position: 'relative' }}
              >
                <Link href={`/diary/today?pet_id=${pet_id}`}>
                  <Image
                    src="/images/diary/btn-3.png"
                    alt="叉叉"
                    width="60"
                    height="40"
                    className="mb-3"
                    style={{
                      cursor: 'pointer',
                      position: 'absolute',
                      right: '-10px',
                      top: '-12px',
                    }}
                  />
                </Link>
                <div className="row gx-5 border-bottom border-warning m-1">
                  <div className="col  my-3" id="food_div">
                    <CiForkAndKnife
                      className={ `${cate == 'food' ? `${styles.statusiconOn}` : `${styles.statusicon}`}`}
                      type="button"
                      id="food"
                      onClick={handleCategoryChange}
                    />
                  </div>
                  <div className="col my-3" id="faeces_div">
                    <FaPoo
                      className={ `${cate == 'faeces' ? `${styles.statusiconOn}` : `${styles.statusicon}`}`}
                      type="button"
                      id="faeces"
                      onClick={handleCategoryChange}
                    />
                  </div>
                  <div className="col my-3">
                    <MdPets
                      className={ `${cate == 'workout' ? `${styles.statusiconOn}` : `${styles.statusicon}`}`}
                      type="button"
                      id="workout"
                      onClick={handleCategoryChange}
                    />
                  </div>
                  <div className="col my-3">
                    <FaBath
                      className={ `${cate == 'bath' ? `${styles.statusiconOn}` : `${styles.statusicon}`}`}
                      type="button"
                      id="bath"
                      onClick={handleCategoryChange}
                    />
                  </div>
                  <div className="col my-3">
                    <FaSyringe
                      className={ `${cate == 'medical' ? `${styles.statusiconOn}` : `${styles.statusicon}`}`}
                      type="button"
                      id="medical"
                      onClick={handleCategoryChange}
                    />
                  </div>
                </div>
                <div className="row flex-nowrap d-flex align-items-center d-flex justify-content-center border-warning">
                  <DiaryForm
                    cate={cate}
                    action="add"
                    diary={diary}
                    handleSubmit={handleSubmit}
                    handleFieldChange={handleFieldChange}
                  />
                </div>
              </div>
              {/* 土司訊息視窗用 */}
              <Toaster />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
