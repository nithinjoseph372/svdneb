import React from 'react';
import './Subpage.css';

const OverOns = () => {
    return (
        <div className="subpage-v2">
            <div className="subpage-header-v2 banner-over-ons-v2">
                <div className="container">
                    <h1 className="animate-fade-in">OVER <span className="text-teal">ONS</span><span className="heading-dot-gold"></span></h1>
                    <p className="delay-100 animate-fade-in">Geschiedenis en missie van de Societas Verbi Divini</p>
                </div>
            </div>

            <div className="container subpage-content-v2">
                <div className="content-grid-v2">
                    <div className="main-content">
                        <h2>ONZE <span className="text-teal">GESCHIEDENIS</span><span className="heading-dot-gold"></span></h2>
                        <p>
                            De naam SVD is een afkorting van het Latijnse Societas Verbi Divini, wat betekent 'Gezelschap van het Goddelijk Woord'.
                            De SVD is een missiecongregatie, die in 1875 werd gesticht door Arnold Janssen te Steyl, bij Venlo (L).
                            Vandaar dat we ook wel genoemd worden: Missionarissen van Steyl.
                        </p>
                        <p>
                            Het is een internationale missiecongregatie, bestaande uit priesters en broeders, afkomstig uit 70 verschillende landen van de zes continenten.
                            Tegenwoordig telt de congregatie ruim 6000 leden wereldwijd. Vaak wonen en werken zij in multiculturele communiteiten, een rijke etnische diversiteit weerspiegelend.
                        </p>

                        <h3 style={{ marginTop: '3rem' }}>DE NEDERLANDS-BELGISCHE <span className="text-teal">PROVINCIE</span><span className="heading-dot"></span></h3>
                        <p>
                            De Nederlands-Belgische provincie van de SVD is daar een onderdeel van. Hoewel de meerderheid van de medebroeders hier ouder is,
                            wonen er sinds de jaren 90 ook jonge mensen uit Indonesië, India, de Filippijnen, China, Congo, Polen en Ghana.
                        </p>
                        <p>
                            Deze zogenaamde Nieuwe Missionarissen willen hier de missionaire aanwezigheid voortzetten en laten zien dat een multiculturele samenleving in de praktijk mogelijk is.
                        </p>
                    </div>

                    <div className="sidebar-v2">
                        <div className="info-card-v2">
                            <h3>ARNOLD <span className="text-teal">JANSSEN</span><span className="heading-dot-gold"></span></h3>
                            <p>Onze stichter, heilig verklaard in 2003, legde de basis voor onze wereldwijde missie in Steyl (1875).</p>
                        </div>
                        <div className="info-card-v2 bg-dark">
                            <h3>WORD <span className="text-teal">LID</span><span className="heading-dot"></span></h3>
                            <p>Voel je een roeping tot het missionaire leven? Neem contact met ons op voor meer informatie over het intreden bij de SVD.</p>
                            <button className="btn btn-teal" style={{ marginTop: '1.5rem', width: '100%' }}>Contact Opnemen</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OverOns;
