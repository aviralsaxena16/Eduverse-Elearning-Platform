import Card from '../../../components/Cards/Card'
import art from '../../../assets/mandala.jpg'
import './quiz.css'
import {useNavigate} from 'react-router-dom'
import { ArrowLeft } from 'lucide-react';
const QuizPage = () => {

   const navigate = useNavigate();
  console.log('QuizPage rendered')
  const products=[{title:'General Knowledge',url:'https://www.pngall.com/wp-content/uploads/10/Knowledge-PNG.png',id:9},
    {title:'Books',url:'https://wallpaperaccess.com/full/1209397.jpg',id:10},
    {title:'Film',url:'https://www.itl.cat/pngfile/big/289-2898876_1920x1080-film-production-wallpaper-data-id-film-production.jpg',id:11},
    {title:'Music',url:'https://wallpapercave.com/wp/eUOju1y.jpg',id:12},
    {title:'Musicals and theatres',url:'https://online.berklee.edu/takenote/wp-content/uploads/2023/05/history_of_musical_theater_article_image_2023.jpg',id:13},
    {title:'Television',url:'https://wallpapercave.com/wp/wp5876954.jpg',id:14},
    {title:'Video Games',url:'https://wallpapercave.com/wp/BFFsnBO.jpg',id:15},
    {title:'Board Games',url:'https://wallpaperbat.com/img/910711-playing-beyond-the-character-sheet.jpg',id:16},
    {title:'Science & Nature',url:'https://anjonag.com/wp-content/uploads/2020/04/cropped-Biology-laboratory-nature-and-science-Plants-with-biochemistry-structure-on-green-background.-1182619005_2125x1416.jpeg',id:17},
    {title:'Computers',url:'https://www.cud.ac.ae/sites/default/files/programs/2020/program-bachelor-of-science-in-computer-science-1920x1080.jpg',id:18},
    {title:'Mathematics',url:'https://image.freepik.com/free-vector/maths-realistic-chalkboard-background_23-2148159844.jpg',id:19},
    {title:'Mythology',url:'https://wallpaperaccess.com/full/6793208.jpg',id:20},
    {title:'Sports',url:'http://www.pixelstalk.net/wp-content/uploads/2016/06/Cool-Sports-HD-Backgrounds.jpg',id:21},
    {title:'Geography',url:'https://wallpaperaccess.com/full/3179400.jpg',id:22},
    {title:'History',url:'https://wallpaperaccess.com/full/724343.jpg',id:23},
    {title:'Politics',url:'https://c.wallhere.com/photos/0c/db/1920x1080_px_democrat_politics_Republican_sign-1581921.jpg!d',id:24},
    {title:'Art',url:`${art}`,id:25},
    {title:'Celebrities',url:'https://th.bing.com/th/id/OIP.CrEHeIbyGrfJpEf8uX1ewwHaJY?rs=1&pid=ImgDetMain',id:26},
    {title:'Animals',url:'https://th.bing.com/th/id/R.7e8c81718b051f10db133eec2e5c04ab?rik=mq1vL3HzlaCKvg&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2f2%2f3%2fc%2f470144.jpg&ehk=A9FOGny2fdhp7ZWWUojmgBhrYd6K2xkslZVDKtYexQE%3d&risl=&pid=ImgRaw&r=0',id:27},
    {title:'Vehicles',url:'https://th.bing.com/th/id/R.4e7acec211a711b2669d91a771c0b4ca?rik=1ij3ke4tcnxHcQ&riu=http%3a%2f%2fwww.pixelstalk.net%2fwp-content%2fuploads%2f2016%2f08%2fFree-Cars-Full-HD-Images-1080p.jpg&ehk=IN1J%2f8CvnnGiJh698L6AgrSF8jq83lL9DMc9lb6t3TA%3d&risl=&pid=ImgRaw&r=0',id:28},
    {title:'Comics',url:'https://th.bing.com/th/id/OIP.TSnNo6ZskSPA7M5Weoc5LgHaEK?rs=1&pid=ImgDetMain',id:29},
    {title:'Gadgets',url:'https://img.freepik.com/premium-photo/compilation-electronic-gadgets-black-background_893571-15167.jpg',id:30},
    {title:'Anime & Manga',url:'https://th.bing.com/th/id/OIP.DOiuqKuI7nPecZeqiAFhjwHaEK?w=262&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',id:31},
    {title:'Cartoon & Animations',url:'https://th.bing.com/th/id/R.f35e938d2642bb6cf9c5318586fa91db?rik=3eh0AkhdqOBzQg&riu=http%3a%2f%2fthemescompany.com%2fwp-content%2fuploads%2f2012%2f01%2fDisney-Cartoon-Wallpaper.jpg&ehk=OmryV1MS%2bbdF6SNZeSiGF1LidQUzeNqXW1wH25VjjIA%3d&risl=&pid=ImgRaw&r=0',id:32},
  
  ]
  
  return (
    <>
     <button onClick={() => navigate(-1)} className="back-button">
        <ArrowLeft size={24} />
      </button>
    <h1>Quiz Page</h1>
    <div className="quiz-page">
    
      {products.map(product => (
        <div className="cardd" key={product.id} onClick={() => navigate(`/quiz/${product.id}`)}>
          <Card title={product.title} url={product.url} id={product.id} />
        </div>
      ))}
    
  </div>
  </>
  )
}

export default QuizPage;