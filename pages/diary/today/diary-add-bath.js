import styles from '@/css/todayadd.module.css'
import Link from 'next/link'

export default function DiaryBathForm({
  action,
  diary,
  handleSubmit,
  handleFieldChange,
  handleDelete,
}) {
  return (
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
              <div className="row flex-nowrap p-2 d-flex justify-content-center">
                <h6 className={styles.input}>保養種類</h6>
                <select
                  className="form-select form-control T-18 rounded-5 border border-primary w-50 text-center p-0"
                  name="diary_act_name"
                  aria-label="default input example"
                  value={diary.diary_act_name}
                  onChange={handleFieldChange}
                  required
                >
                  <option value="0">保養種類</option>
                  <option value="洗澡">洗澡</option>
                  <option value="梳毛">梳毛</option>
                  <option value="剪指甲">剪指甲</option>
                  <option value="剪毛">剪毛</option>
                </select>
              </div>
              {/* <div className="row flex-nowrap p-2 d-flex justify-content-center">
                <h6 className={styles.input}>時長</h6>
                <input
                  className="form-control T-18 rounded-5 border border-primary w-50 text-center"
                  type="number"
                  name="diary_duration_min"
                  value={diary.diary_duration_min}
                  min="1"
                  step="0.5"
                  required
                  placeholder="時長(分)"
                  aria-label="default input example"
                  onChange={handleFieldChange}
                />
              </div> */}
              <div className="row flex-nowrap p-2 d-flex justify-content-center">
                <h6 className={styles.input}>備註</h6>
                <input
                  className="form-control T-18 rounded-5 border border-primary w-50 text-center"
                  style={{ height: '100px' }}
                  type="text"
                  name="diary_memo"
                  value={diary.diary_memo}
                  maxLength="100"
                  placeholder="備註"
                  onChange={handleFieldChange}
                />
              </div>
              {/* 下方欄位 */}
              <div className="text-center m-2 p-2">
                <div
                  className="d-flex justify-content-center"
                  style={{ gap: '24px' }}
                >
                  {action == 'add' ? (
                    <Link href={`/diary/today?pet_id=${diary.diary_pet_id}`}>
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-lg"
                        style={{ width: 200 }}
                      >
                        取消
                      </button>
                    </Link>
                  ) : (
                    <>
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-lg"
                        style={{ width: 200 }}
                        onClick={handleDelete}
                      >
                        刪除
                      </button>
                    </>
                  )}
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
  )
}
