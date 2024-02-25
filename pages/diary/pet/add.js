import { useState } from 'react'
import axios from 'axios'
import styles from '@/css/petadd.module.css'
import toast, { Toaster } from 'react-hot-toast'
import { useContext } from 'react'
import AuthContext from '@/components/contexts/AuthContext'
import PreviewUploadImage from '@/components/avatar/preview-upload-image'
import VerticalNavBar from '@/pages/diary/vertical-nav-bar'

import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  const { auther } = useContext(AuthContext)
  const [selectedFile, setSelectedFile] = useState(null)
  const [pet, setPet] = useState({
    pet_owner_id: auther.sid,
    pet_name: '',
    pet_type: '', // FIXME: hard code
    pet_breed: '',
    pet_birthday: '',
    pet_chip_id: '',
    pet_gender: '',
    pet_height: '',
    pet_weight: '',
  })

  // 欄位處理
  const handleFieldChange = (e) => {
    setPet({ ...pet, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    // 阻擋表單預設送出行為
    e.preventDefault()

    const res = await axios.post('http://localhost:3002/diary/pet/add', pet)

    if (res.data.status === 'success') {
      toast.success('資訊 - 寵物新增成功')
    } else {
      toast.error(`錯誤 - 寵物新增失敗`)
    }

     // 上傳頭像用，有選擇檔案時再上傳
    if (selectedFile && res.data.status) {
      const new_pet_id = res.data.data.pet_id
      const formData = new FormData()
      // 對照server上的檔案名稱 req.files.avatar
      formData.append('avatar', selectedFile)

      // const res2 = await updateProfileAvatar(formData)
      const res2 = await axios.post(
        `http://localhost:3002/diary/pet/upload-avatar?owner_id=${auther.sid}&pet_id=${new_pet_id}`,
        formData
      )

      // console.log(res2.data)
      if (res2.data.status === 'success') {
        toast.success('會員頭像修改成功')
      }
    }

    setTimeout(() => {
      router.push('/diary/')
    }, 2000);
  }

  const handleCancel = async () => {
    router.push('/diary/')
  }


  return (
    <>
      <main className={styles.main}>
        {/* 左邊欄位 */}
        <VerticalNavBar
          focused='info'
        />
        {/* 左邊欄位 */}
        {/* 中間欄位 */}
        <div className={styles.myBody}>
          <form onSubmit={handleSubmit}>
            <div>
              {/* <div className={styles.item}>
                <img
                  className={styles.petHeadpic}
                  src="/images/diary/updatepic.png"
                  alt="PetHeadpic"
                />
                <BsPencilSquare className={styles.notify} />
              </div> */}
              <PreviewUploadImage
                avatarImg={pet.pet_avatar}
                avatarBaseUrl="http://localhost:3002/img/avatar/pet/"
                setSelectedFile={setSelectedFile}
                selectedFile={selectedFile}
              />
              <div className="">
                <div className="card-body">
                  <div className="col p-3">
                    <div className="row flex-nowrap p-2">
                      <h6 className={styles.input}>姓名</h6>
                      <input
                        className="form-control T-18 rounded-5 border border-primary w-75 text-center"
                        type="text"
                        name="pet_name"
                        maxLength="10"
                        value={pet.pet_name}
                        placeholder="姓名"
                        aria-label="default input example"
                        onChange={handleFieldChange}
                      />
                    </div>
                    <div className="row flex-nowrap p-2">
                      <h6 className={styles.input}>生日/領養日</h6>
                      <input
                        className="form-control T-18 rounded-5 border border-primary w-75 text-center"
                        type="date"
                        name="pet_birthday"
                        value={pet.pet_birthday}
                        placeholder="生日/領養日"
                        aria-label="default input example"
                        onChange={handleFieldChange}
                      />
                    </div>
                    <div className="row flex-nowrap p-2">
                      <h6 className={styles.input}>種類</h6>
                      <select
                        className="form-select form-control T-18 rounded-5 border border-primary w-75 text-center p-0"
                        name="pet_type"
                        value={pet.pet_type}
                        onChange={handleFieldChange}
                      >
                        <option value="0">寵物類型</option>
                        <option value="猫">猫</option>
                        <option value="狗">狗</option>
                      </select>
                    </div>
                    {/* 少"貓或狗"的欄位 */}
                    <div className="row flex-nowrap p-2">
                      <h6 className={styles.input}>品種</h6>
                      <input
                        className="form-control T-18 rounded-5 border border-primary w-75 text-center"
                        type="text"
                        name="pet_breed"
                        value={pet.pet_breed}
                        maxLength="10"
                        placeholder="品種"
                        aria-label="default input example"
                        onChange={handleFieldChange}
                      />
                    </div>
                    <div className="row flex-nowrap p-2">
                      <h6 className={styles.input}>性別</h6>
                      <select
                        className="form-select form-control T-18 rounded-5 border border-primary w-75 text-center p-0"
                        name="pet_gender"
                        value={pet.pet_gender}
                        onChange={handleFieldChange}
                      >
                        <option value="0">選擇性別</option>
                        <option value="公">公</option>
                        <option value="母">母</option>
                      </select>
                    </div>
                    <div className="row flex-nowrap p-2">
                      <h6 className={styles.input}>晶片號碼</h6>
                      <input
                        className="form-control T-18 rounded-5 border border-primary w-75 text-center"
                        type="text"
                        name="pet_chip_id"
                        value={pet.pet_chip_id}
                        maxLength="15"
                        placeholder="晶片號碼"
                        aria-label="default input example"
                        onChange={handleFieldChange}
                      />
                    </div>
                  </div>
                  {/* 土司訊息視窗用 */}
                  <Toaster />
                </div>
              </div>
              {/* 下方欄位 */}
              <div className="text-center mb-5 p-4">
                <div
                  className="d-flex justify-content-center"
                  style={{ gap: '24px' }}
                >
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-lg"
                    style={{ width: 200 }}
                    onClick={handleCancel}
                  >
                    取消
                  </button>
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
          </form>
        </div>
      </main>
    </>
  )
}
