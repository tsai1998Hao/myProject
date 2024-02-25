import { useEffect, useState } from 'react'
import axios from 'axios'
import styles from '@/css/todayadd.module.css'
import toast, { Toaster } from 'react-hot-toast'

import { useRouter } from 'next/router'

import VerticalNavBar from '@/pages/diary/vertical-nav-bar'
import Link from 'next/link'

export default function Home() {
  const router = useRouter()
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

  const handleSubmit = async (e) => {
    // 阻擋表單預設送出行為
    e.preventDefault()

    toast.success('資訊 - 鬧鐘設定成功')

    setTimeout(() => {
      router.push(`/diary/status?pet_id=${pet_id}`)
    }, 2000)
  }

  useEffect(() => {
    if (router.isReady) {
      // 從router.query得到所有查詢字串參數
      const { pet_id } = router.query

      // 載入資料
      getPetData(pet_id)
      setPetId(pet_id)
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
                <>
                  <form onSubmit={handleSubmit}>
                    <div className="">
                      <div className="card-body">
                        <div className="col ">
                          <div className="row flex-nowrap p-2 d-flex justify-content-center mt-3">
                            <h6 className={styles.input}>記錄日</h6>
                            <input
                              className="form-control T-18 rounded-5 border border-primary w-50 text-center"
                              type="date"
                              name="diary_date"
                              value={diary.diary_date}
                              placeholder="紀錄日"
                              aria-label="default input example"
                              onChange={handleFieldChange}
                            />
                          </div>
                          <div className="row flex-nowrap p-2 d-flex justify-content-center">
                            <h6 className={styles.input}>開始時間</h6>
                            <input
                              className="form-control T-18 rounded-5 border border-primary w-50 text-center"
                              type="time"
                              name="diary_date_time"
                              value={diary.diary_date_time}
                              placeholder="開始時間"
                              aria-label="default input example"
                              onChange={handleFieldChange}
                            />
                          </div>
                          {/* 下方欄位 */}
                          <div className="text-center m-2 p-2">
                            <div
                              className="d-flex justify-content-center"
                              style={{ gap: '24px' }}
                            >
                              <Link href={`/diary/status?pet_id=${pet_id}`}>
                                <button
                                  type="button"
                                  className="btn btn-outline-primary btn-lg"
                                  style={{ width: 200 }}
                                >
                                  取消
                                </button>
                              </Link>
                              <button
                                type="submit"
                                className="btn btn-danger btn-lg text-white"
                                style={{ width: 200 }}
                              >
                                儲存
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </>
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
