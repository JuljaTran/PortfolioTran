import './About.css';

export default function About() {
    return (
        <section id="about" className="section about gradient-about">
            <div className="container about-grid">
                <div className="about-left">
                    <h2 className="section-title">Über mich</h2>
                    <h3 className="about-subtitle">Hey, ich bin Julia.</h3>
                    <p className="about-text">
                        Ich bin im letzten Jahr des B.Sc. in Medientechnik und -design an der FH OÖ Hagenberg mit großem Interesse an Web und digitalen Medien. 
                        Ich setze Projekte gern praktisch um, erweitere stetig meine Fähigkeiten und gestalte Inhalte, die funktional und ansprechend sind. 
                        Mein Ziel ist es, in der Webbranche kreative und wirkungsvolle Lösungen zu entwickeln.</p><br />
                    <button className="download-cv-btn" onClick={() => window.location.href = './CV/Download_CV_Tran_DE.pdf'}>Download CV</button> 
                </div>
                <div className="about-right">
                    <img src="../public/img/Homepage/JTKT_smile_0c.jpg" alt="Julia smiling portrait" className="about-photo"/>
                </div>
            </div>
        </section>
    );
}
