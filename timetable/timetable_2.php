<!DOCTYPE html>
<html lang="en">
    <head>
        <title>TimeTable</title>
        <!-- Link to css -->
        <!-- <link rel="stylesheet" type="text/css" href="http://206.189.207.206/tracker/timetable/timetable.css"> -->
        <link rel="stylesheet" type="text/css" href="timetable.css">
        <meta charset="UTF-8">
        <!-- <meta name="viewport" content="width=device-width, 
        initial-scale=1"> -->
        <meta name="viewport" content="width=device-width; initial-scale=1.0;">
        <script src="http://206.189.207.206/tracker/timetable/script.js" defer></script>
       
    </head>
  <body>
     <!-- Navigation Bar -->
    <header>
        <div class="logo">
          <p>Mutall</p>
        </div>
        <nav class="navbar">
         <a href="#" class="toggle-button">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
         </a>
         <div class="nav-li hide">
          <ul class="nav-list">
            <li class="nav"><a class="ul" href="http://206.189.207.206/tracker/v/code/view_minutes.html">Minutes</a></li>
            <li class="nav"><a class="ul" href="http://206.189.207.206/tracker/portfolio/2023/">Portfolios</a></li>
            <li class="nav"><a class="ul" href="http://206.189.207.206/tracker/timetable/presentation.html">Presentation</a></li>
            <li class="nav"><a class="ul" href="http://206.189.207.206/tracker/v/code/">Metavisio</a></li>
            <li class="nav"><a class="ul" href="http://206.189.207.206/documentation/v/code/">Documentation</a></li>
            <li class="nav"> <button><a class="ul" href="http://206.189.207.206/chama/v/code/">Chat</a></button></li>
          </ul>
         </div>
        </nav> 
        <!-- <button><a class="ul" href="#">Chat</a></button>    -->
       </div> 
       
		</header>
        <!-- Title and Time -->
     <div class="title">
        <h1>TimeTable</h1>
     </div>
     <div class="time">
        <h5>  
        <?php 
            echo date("l jS \of F Y ");
         ?>        
        </h5>  
    </div>
    
     
     <div class="day <?php if(date('l') == 'Monday') echo 'highlight'; ?> " id="monday">
         <h2>Monday</h2>
          <!-- Kangara Details -->
          <div class="details">   
                <div class="img">
                    <img class="rounded-corners" src="http://drive.google.com/uc?export=view&id=10KYtxL82ANblZbwrAgMc_R7WoHTu8KKD" alt="" >
                </div>     
            <div class="portfolio">
                <a href="http://206.189.207.206/tracker/portfolio/2023/kangara.html">George Kanga'ra(GK)</a><br>
                  <p><small>Bsc. Computer Technology: 2019<br>
                     Meru University
                  </small></p>
            </div>        
          </div>
    
            <!-- Andrew Details -->
          <div class="details">
            <div class="img">
                    <img class="rounded-corners" src="http://206.189.207.206/tracker/portfolio/image/drew.jpg" alt="" >
            </div>
            <div class="portfolio">
                <a href="http://206.189.207.206/tracker/portfolio/2023/mugambi.html">Andrew Mugambi(AM)<br></a>
                <p><small>Bsc. Business Information Technology:2016<br>
                     Africa Nazarene University
                </small></p>
              </div> 
          </div>
          <!-- Mogaka's Details -->
         <div class="details">   
                <div class="img">
                <img class="rounded-corners" src="https://lh3.googleusercontent.com/znsFftPpl4DT62U3k2x0gl-VUtGqGik5LmA2GhkPyVvGdkK0WnSGramnL3UQOFfMID6MCZChyI0I-rrH60Y6sgjcwzeIvquOeNGgd3dq4zjFONt_sWo5NoiTnk-ICf-MnkdL6mmIQQ=w2400" alt="" >
                </div>     
            <div class="portfolio">
                <a href="#">James Mogaka(JM)</a><br>
                  <p><small>Bsc. Software Engineering: 2023  <br>
                     Cooperative University
                  </small></p>
            </div>        
          </div>
          <!-- Simon Details -->
         <div class="details">   
                <div class="img">
                <img class="rounded-corners" src="https://lh3.googleusercontent.com/znsFftPpl4DT62U3k2x0gl-VUtGqGik5LmA2GhkPyVvGdkK0WnSGramnL3UQOFfMID6MCZChyI0I-rrH60Y6sgjcwzeIvquOeNGgd3dq4zjFONt_sWo5NoiTnk-ICf-MnkdL6mmIQQ=w2400" alt="" >
                </div>     
            <div class="portfolio">
                <a href="http://206.189.207.206/tracker/portfolio/2023/karanja.html">Simon Karanja(SK)</a><br>
                  <p><small>Diploma in IT(Ongoing)|Diploma in Cyber Security and Ethical Hacking:2023<br>
                     Cooperative University
                  </small></p>
            </div>        
          </div>
          <!-- Group Details  -->
          <div class="details">
                <div class="img-group">
                  <img class="squared-corners" src="http://206.189.207.206/tracker/timetable/img/system.png" alt="" >          
                </div>
                <div class="portfolio"> 
                    <p>
                      <small><strong>Content Management System</strong><br>
                           GM, JK
                      </small>
                    </p>
                </div>
          </div>   
     </div>
    
       <!-- Tuesday -->
     <div class="day <?php if(date('l') == 'Tuesday') echo 'highlight'; ?>" id="tuesday">
       <!-- <div class="day highlight" id="tuesday"> -->
      <h2>Tuesday</h2>
        <!-- Isaac Details -->
        <div class="details">
                <div class="img">
                   <img class= "rounded-corners" src="http://206.189.207.206/tracker/portfolio/image/weru.jpg"  alt=" ">        
                </div>
                <div class="portfolio">
                    <a href="http://206.189.207.206/tracker/portfolio/2023/weru.html">Isaac Waweru(IW)<br></a> 
                    <p><small>Bsc.  Mechatronics engineering</small></p>
                </div>
          </div>  
          <!-- George's Details -->
        <div class="details">
             <div class="img">
                    <a href="https://lh3.googleusercontent.com/x7nJjq2_nEWxboeNnPQq1lqGs55EZGVie8UatieTs31D9LSXZ0whOYX56QHZNpKaJyvBQY5iaT_V4vvVfWEpiGvo_HkBkGV-dX-MWV_LwaSlqtM2WpQBDynL_KZ6EUmgBFMg8j-nww=w2400?source=screenshot.guru"> <img class="rounded-corners" src="https://lh3.googleusercontent.com/x7nJjq2_nEWxboeNnPQq1lqGs55EZGVie8UatieTs31D9LSXZ0whOYX56QHZNpKaJyvBQY5iaT_V4vvVfWEpiGvo_HkBkGV-dX-MWV_LwaSlqtM2WpQBDynL_KZ6EUmgBFMg8j-nww=w600-h315-p-k"> </a>           
            </div> 
            <div class="portfolio">
                 <a href="http://206.189.207.206/tracker/portfolio/2023/munya.html">George Munya(GM)<br></a>
                 <p><small>Diploma in Information Communication Technology:2022<br>
                    Kabete Technical
                 </small></p>
            </div>   
        </div>  
         <!-- Chris Details -->
         <div class="details">   
                <div class="img">
                    <img class="rounded-corners" src="http://206.189.207.206/tracker/portfolio/image/reece.jpeg" alt="" >
                </div>     
            <div class="portfolio">
                <a href="http://206.189.207.206/tracker/portfolio/2023/kinyanjui.html">Chris Kinyanjui(CK)</a><br>
                  <p><small>Bsc. Computer Science: 2024 <br>
                     Dedan Kimathi University of Technology
                  </small></p>
            </div>        
          </div>
          <!-- Joshua Details -->
         <div class="details">   
                <div class="img">
                    <img class="rounded-corners" src="https://lh3.googleusercontent.com/znsFftPpl4DT62U3k2x0gl-VUtGqGik5LmA2GhkPyVvGdkK0WnSGramnL3UQOFfMID6MCZChyI0I-rrH60Y6sgjcwzeIvquOeNGgd3dq4zjFONt_sWo5NoiTnk-ICf-MnkdL6mmIQQ=w2400" alt="" >
                </div>     
            <div class="portfolio">
                <a href="#">Joshua Omondi(JO)</a><br>
                  <p><small>Bsc. Computer Science: 2024 <br>
                     Jomo Kenyatta University of Agriculture and Technology
                  </small></p>
            </div>        
          </div>
        <!-- Group Details  -->
        <div class="details">
                <div class="img-group">
                    <img class="squared-corners" src="http://206.189.207.206/tracker/timetable/img/css.png" alt="" >       
                </div>
                <div class="portfolio"> 
                    <p>
                      <small><strong>Animation working group</strong><br>
                       CW
                      </small>
                    </p>
                </div>
        </div>    
     </div>

    <!-- Wednesday -->
    <div class="day <?php if(date('l') == 'Wednesday') echo 'highlight'; ?> " id="wednesday">
        <h2>Wednesday</h2>
       <!-- sharon's Details -->
        <div class="details">
            <div class="img">             
               <a href="https://lh3.googleusercontent.com/Ffxiv6kqEGP8ixQF1udakKYXQ--cdvQcyc7PlaIMbZT6UZMGZZRscOsfJ7QU7W5kMKSQ29K1WSR8h88INpHbZMRxcByaAYXpj620IuM6Ks7O4FzL40HDI420v29xNTmrRMBEisdPqw=w2400?source=screenshot.guru"> <img class="rounded-corners" src="https://lh3.googleusercontent.com/Ffxiv6kqEGP8ixQF1udakKYXQ--cdvQcyc7PlaIMbZT6UZMGZZRscOsfJ7QU7W5kMKSQ29K1WSR8h88INpHbZMRxcByaAYXpj620IuM6Ks7O4FzL40HDI420v29xNTmrRMBEisdPqw=w600-h315-p-k" overflow="hidden"> </a>
            </div>
            <div class="portfolio">
               <a href="http://206.189.207.206/tracker/portfolio/2023/wanjiru.html">Sharon Wanjiru(SW)<br></a> 
               <p>
                <small>Bsc. Informatics and Computer Science:2023<br>
                  Strathmore University
                </small>
              </p>
           </div>   
        </div>   
          <!-- Carol's Details -->
        <div class="details">
             <div class="img">
                <img class="rounded-corners" src="http://drive.google.com/uc?export=view&id=1xlKJbMwmZw6unrBj8RCWpXBytNXS4kKX" alt="" >
                 <!-- <a href="https://lh3.googleusercontent.com/6RSUmagWNh_WTpC3ttsnCGQy7l3X-hyXmpotYYRI5yufzTYYv3-V0jMD5kaBrcXVoz3aXgTvOqG035xnWPgwRm8IntLM5eczOx-6QFCS4rcw7AK2dwV84OG3_MwHpFQhfe66sEdffw=w2400?source=screenshot.guru"> <img class="rounded-corners" src="https://lh3.googleusercontent.com/6RSUmagWNh_WTpC3ttsnCGQy7l3X-hyXmpotYYRI5yufzTYYv3-V0jMD5kaBrcXVoz3aXgTvOqG035xnWPgwRm8IntLM5eczOx-6QFCS4rcw7AK2dwV84OG3_MwHpFQhfe66sEdffw=w417-h315-p-k" /> </a>          -->
            </div> 
            <div class="portfolio">
                 <a href="http://206.189.207.206/tracker/portfolio/2023/wawira.html">Carol Wawira(CW)<br></a>
                 <p>
                  <small>Diploma in Business Information Technology:2022<br>
                     Cooperative University
                  </small>
                </p>
            </div>   
        </div>
       <!-- Kelvin Details -->
       <div class="details">   
                <div class="img">
                    <img class="rounded-corners" src="https://lh3.googleusercontent.com/znsFftPpl4DT62U3k2x0gl-VUtGqGik5LmA2GhkPyVvGdkK0WnSGramnL3UQOFfMID6MCZChyI0I-rrH60Y6sgjcwzeIvquOeNGgd3dq4zjFONt_sWo5NoiTnk-ICf-MnkdL6mmIQQ=w2400" alt="" >
                </div>     
            <div class="portfolio">
                <a href="http://206.189.207.206/tracker/portfolio/2023/mungai.html">Kelvin Mungai(KM)s</a><br>
                  <p><small>Bsc. Information Technology: 2025 <br>
                     Masinde Muliro University
                  </small></p>
            </div>        
          </div>
        <!-- Group Details  -->
        <div class="details">
                <div class="img-group">
                  <img class= "squared-corners" src="http://206.189.207.206/tracker/timetable/img/processing.jpg"  alt=" "> 
                </div>
                <div class="portfolio"> 
                    <p>
                      <small><strong>Image management working group</strong><br>
                        GM, SW , AM
                      </small>
                    </p>
                </div>
          </div>   
    </div>

    <!-- Thursday -->
    <div class="day <?php if(date('l') == 'Thursday') echo 'highlight'; ?> " id="thursday">
        <h2>Thursday</h2>
       <!-- Bernards Details -->
       <div class="details">
            <div class="img">
               <img class="rounded-corners" src="http://206.189.207.206/tracker/v/images/muli.jpg" alt="">
              <!-- <a href="https://lh3.googleusercontent.com/6RSUmagWNh_WTpC3ttsnCGQy7l3X-hyXmpotYYRI5yufzTYYv3-V0jMD5kaBrcXVoz3aXgTvOqG035xnWPgwRm8IntLM5eczOx-6QFCS4rcw7AK2dwV84OG3_MwHpFQhfe66sEdffw=w2400?source=screenshot.guru"> <img class="rounded-corners" src="https://lh3.googleusercontent.com/6RSUmagWNh_WTpC3ttsnCGQy7l3X-hyXmpotYYRI5yufzTYYv3-V0jMD5kaBrcXVoz3aXgTvOqG035xnWPgwRm8IntLM5eczOx-6QFCS4rcw7AK2dwV84OG3_MwHpFQhfe66sEdffw=w417-h315-p-k" /> </a> -->
            </div>
            <div class="portfolio">
              <a href="http://206.189.207.206/tracker/portfolio/2023/muli.html">Bernard Muli(BM)<br></a> 
             <p>
              <small>Certificate in IT:2017<br>
                 Daystar University
              </small>
            </p>
          </div>   
        </div>   
         <!-- James Details -->
        <div class="details">
            <div class="img">
              <img class="rounded-corners" src="https://lh3.googleusercontent.com/pw/AMWts8CyI5Nz8iqJYeK5oLBujhR23dm-FV4RtO-TUoxHoVMoT9_J0kpIi5StZsomLL4yeFi68a-fFvjjJashydaAYi4JnUAWYdE6qPGyefQ4yGkoa5_hCqi6B8CY_lO6xb0cg4qo-OEBqy0gU1Rtq74r-lrySQ=w708-h960-s-no?authuser=0" alt="">
            </div>
            <div class="portfolio">
                <a href="http://206.189.207.206/tracker/portfolio/2023/kibe.html">Ndichu James Kiberenge(JK)<br></a> 
                <p>
                  <small>Diploma In IT:2020<br>
                    KCA 
                  </small>
                </p>
             </div>   
        </div>   
        <!-- Group Details  -->
        <div class="details">
                <div class="img-group">
                  <img class="squared-corners" src="http://206.189.207.206/tracker/timetable/img/drag.png" alt="" >
                </div>
                <div class="portfolio"> 
                    <p>
                      <small><strong>Drag and drop group</strong><br>
                       GK,CW
                      </small>
                    </p>
                </div>
          </div>   
    </div>

      <!-- Friday -->
      <div class="day <?php if(date('l') == 'Friday') echo 'highlight'; ?>" id="friday">
        <h2>Friday</h2>
       <!-- Peter's details -->
        <div class="details">
            <div class="img">
              <img class="rounded-corners" src="https://db3pap003files.storage.live.com/y4mYkTxSEdlNhFREDQ7FZvRrdtMGliIzvjGykN_dx2Y16yNfAx0pECbD0sPnKLa9Xmc4u0E--9P-m5PO02f5A2BiZxJd-Iz8d4FGlhV899pAgFC5tn_p2UIGUfyJUeW0kDeuTEGWqTvbvvb6W2dNW-nVWk-5knHb0dbsIdk21q-g5cI5mQjSMhznMMK1ksAMIWX?width=256&amp;height=256&amp;cropmode=none" width="50px" height="50px">
            </div>
            <div class="portfolio">
             <a href="http://206.189.207.206/tracker/portfolio/2023/kungu.html">Peter Kungu(PK)<br></a> 
             <p>
              <small>Bsc. Mathematics and Computer Science:2019<br>
                Multimedia University
              </small>
             </p>
            </div>   
        </div>   
        
        <!-- Mwaniki's Details -->   
        <div class="details">
          <div class="img">
             <img class="rounded-corners" src="http://206.189.207.206/tracker/portfolio/image/mwaniki.jpg">
          </div>
          <div class="portfolio">
           <a href="http://206.189.207.206/tracker/portfolio/2023/mwaniki.html">Joseph Mwaniki(JM)<br></a> 
           <p>
            <small>Bsc. Sales and Marketing: 2018<br>
              Presbyterian University
            </small>
           </p>
         </div>   
        </div> 
        
         <!-- Anns Details -->   
         <div class="details">
          <div class="img">
             <img class="rounded-corners" src="http://206.189.207.206/tracker/portfolio/image/mbugua.jpg">
          </div>
          <div class="portfolio">
           <a href="http://206.189.207.206/tracker/portfolio/2023/mbugua.html">Ann Wanjiru(AW)<br></a> 
           <p>
            <small>Bsc. Biochemistry: 2019<br>
              University Of Nairobi
            </small>
           </p>
         </div>   
        </div> 
        
        <!-- Group Details  -->
        <div class="details">
                <div class="img-group">
                  <img class="squared-corners" src="http://206.189.207.206/tracker/timetable/img/migration.png" alt="" >     
                </div>
                <div class="portfolio"> 
                    <p><small><strong>Migration group</strong><br>
                        GK,PK,BM
                       </small>
                    </p>
                </div>
          </div>   

    </div>
     
  </body>

</html>

