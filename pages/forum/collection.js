import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'

//這裡的css module叫做forum唷
import styles from "../../css/forum/creation.module.css"
//這裡的css module叫做forum唷







// 時間格式
import dayjs from 'dayjs'
// 時間格式

const inter = Inter({ subsets: ['latin'] })
// import { useState } from 'react';


//要引入資料了!!!!要引入資料了!!!!要引入資料了!!!!要引入資料了!!!!要引入資料了!!!!要引入資料了!!!!要引入資料了!!!!要引入資料了!!!!要引入資料了!!!!

// import { Layout1 } from "@/components/Layout1";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AB_CREATION ,AB_DEL_ONE} from "@/components/my-const_forum";
// import dayjs from "dayjs"; 時間的格式
import { useRouter } from "next/router";

//要引入資料了!!!!要引入資料了!!!!要引入資料了!!!!要引入資料了!!!!要引入資料了!!!!要引入資料了!!!!要引入資料了!!!!要引入資料了!!!!要引入資料了!!!!












// icon
import { BsActivity } from "react-icons/bs";
import { BsArchiveFill } from "react-icons/bs";
import { BsCupHotFill } from "react-icons/bs";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { BsPencilFill } from "react-icons/bs";
import { BsFileEarmarkMusicFill } from "react-icons/bs";
// icon





export default function ABIndex() {
    const [data, setData] = useState({});
    const router = useRouter();
  
    const getListData = async () => {
      try {
        const r = await fetch(AB_CREATION + `?article_member_id=777`);
        const d = await r.json();
        setData(d);
      } catch (ex) {
        console.error(ex);
      }
    };
  
    useEffect(() => {
      getListData();
    }, []);
  
  const [myForm, setMyForm]= useState({
    article_id:"",
    article_member_id:"",
    article_boardcategory_name:"",
    article_title_name:"",
    article_content:"",
    article_release_date:"",
    article_update_date:"",
    article_like_num:"",
    article_comment_num:"",
    pic:"",
  });
  
  
    useEffect(()=>{
  
    const article_id = +router.query.article_id;
    console.log({article_id, raw: router.query.article_id});  
    },[router.query.article_id]);
  

    const [displayInfo, setDisplayInfo] =useState("");

  
    const changeHandler =(e) =>{
        const { name, id, value} =e.target;
        console.log({name, id, value});
        setDisplayInfo("");
        setMyForm({...myForm, [id]: value});
    };
    // console.log(myForm)
  
    const onSubmit = async (e)=>{
      e.preventDefault();
      const r = await fetch(AB_CREATION + "/" + myForm.article_id, {
        method: "PUT",
        body: JSON.stringify(myForm),
        headers: {
          "Content-Type": "application/json",
        },
      })
      const responseData= await r.json();
      console.log(r);
  





//拿新增來的彈出視窗????
      if(responseData.success){
        setDisplayInfo("succ");
        alert("修改成功了唷!!!!!")
      }else{
        setDisplayInfo("fail");
  
        alert('沒辦法讓你送出，但是你卻成功了??好啦你很棒')
      }
    };
//拿新增來的彈出視窗???????





  return (
    <>

      <main className={styles.main}>

{/* 左邊欄位 */}
          <div className={styles.leftList}>
               <div className={styles.memberPicOut}>
                   <img className={styles.memberPic} src='/images/forum/dogmember.jpg'></img>
               </div> 

              <div className={styles.memberItems}>
                  <br></br>
                <div className={styles.name}>會員名稱</div>
                <br></br>
                <div className={styles.name}>memberNameInEng</div>
                <br></br>  
                <div className={styles.nowLocationOut}>
                   <div className={styles.nowLocation}>我的收藏</div> 
                </div> 
              </div>  

            <div className={styles.iconsOut}>
              <div className={styles.icons}>
                <br></br>
                <div className={styles.icon}><BsActivity              className={styles.iconSick}/><a className={styles.iconLink} href='#'> 毛孩小毛病</a></div>
                <div className={styles.icon}><BsArchiveFill           className={styles.iconSick}/><a className={styles.iconLink} href='#'> 好用家用品</a></div>

                <div className={styles.icon}><BsCupHotFill            className={styles.iconSick}/><a className={styles.iconLink} href='#'> 時髦貓食</a></div>

                <div className={styles.icon}><BsPencilFill            className={styles.iconSick}/> <div className={styles.iconLink}><Link className={styles.iconLink} href={`/forum/create`}>創作文章</Link></div> 
                </div>

                <div className={styles.icon}><BsFileEarmarkMusicFill  className={styles.iconSick}/> <div className={styles.iconLink}><Link className={styles.iconLink} href={`/forum/creation`}>我的文章</Link></div> 
                </div>

                <div className={styles.icon}><BsFillBookmarkHeartFill className={styles.iconSick}/><a className={styles.iconLink} href='#'> 我的收藏</a></div>
              </div>
            </div>

          </div>
{/* 左邊欄位 */}

{/* 右上標題 */}
        <div className={styles.article}>
          <div className={styles.articleTitle}>

          <h4 className={styles.titlePopular}>
                <div className={styles.articleCardTitle}>我的收藏 目前資料不正確</div>
            </h4>





          </div>
          <hr></hr>
          <div className={styles.articleWhileContents}>
{/* 右上標題 */}



<div className="row">
          <div className="col">
              { data.rows && data.rows.map((i)=>{

                return(
                  <>

                    <div key={i.article_id} className={styles.articleCard}>
                      <div className={styles.articleCardIcMe}>
                        <img className={styles.articleCardMemberIcon} src='/images/forum/womanIcon.svg'></img>&nbsp;&nbsp;
                        <div className={styles.articleCardWriter}>{ i.article_member_id }</div>
                        <div className={styles.articleCardTime}>&nbsp;&nbsp;&nbsp;&nbsp;{ dayjs(i.article_release_date).format('YYYY-MM-DD') }</div>

                      </div>
                      
                      <Link href={`/forum/articleContent/${i.article_id}`} className={styles.articleCardLink}>
                        <div className={styles.articleCardTitle}>{ i.article_title_name }
                          <div className={styles.articleCardContent}>{ i.article_content }</div>
                        </div>
                      </Link>
                      <div className={styles.articleCardLCS}>
                        <img className={styles.like} src='/images/forum/like.svg'></img>
                        <div>{ i.article_like_num }</div>
                        <img className={styles.chat} src='/images/forum/chat.svg'></img>
                        <div>{ i.article_comment_num }</div>




                        {/* <img className={styles.save} src='/images/forum/save.svg'></img>
                        <div>收藏</div> */}
                      </div>
                      {/* <img className={styles.newsPic} src='/images/forum/news.svg'></img> */}
                    </div>
                </>
                );})}

    </div>
</div>

<br></br>
<br></br>
<br></br>




{/* 分頁們 */}{/* 分頁們 */}{/* 分頁們 */}{/* 分頁們 */}{/* 分頁們 */}{/* 分頁們 */}{/* 分頁們 */}{/* 分頁們 */}
<div className="row">
          <div className="col">
            <nav aria-label="Page navigation example">
              <ul className="pagination">{data.success && data.totalPages ? Array(11).fill(1).map((v,i)=>{
                const p =data.page -5 +i;
                  if(p<1 || p>data.totalPages) return null;
                    return(
                            <li key={p} className={ p===data.page ?"page-item active" :"page-item"}>
                              <Link className="page-link" href={"?page=" +p }>{p}</Link>
                            </li>
                          )
              }):null}
              </ul>
            </nav>
          </div>
        </div>
{/* 分頁們 */}{/* 分頁們 */}{/* 分頁們 */}{/* 分頁們 */}{/* 分頁們 */}{/* 分頁們 */}{/* 分頁們 */}{/* 分頁們 */}





          </div>

        </div>



      </main>


    </>
  )
}
