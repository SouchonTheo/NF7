import '../css/Form.css';
import '../css/Home.css'

export default function Home() {
    return (
        <div className= "background">
            <h3>Hi! This is the homepage of NF7!</h3>
            <h4>About Us:</h4>
            <h5>What is NF7?</h5>
            <p className= "par"> 
                NF7 is an application that helps you to manage your NFTs. <br/>
                 You can discover all the NFT of our users, mint your own NFT and have access to your NFT wallet!
            </p>
            <h5>Who are we?</h5>
            <p className= "par"> 
                We - Basile Gros, Théo Souchon, Diego Rogard and Pablo Neyens - are N7 students. <br/>
                Our interest in NFT led us to create a website related to this topic. For us, this was the opportunity to dig deeper in this subject while learning the basics of web programming.
                We had the occasion to discover new technologies that will surely be very useful in our futur professional life, such as React or NodeJS.
            </p>
        </div>
    )
}