# Workers Rights Watch Website - User Journey Flows

## Different Types of Visitors & Their Journeys

This document shows how different people use the Workers Rights Watch website based on their goals.

---

## User Flow 1: First-Time Visitor Learning About WRW

**User Type:** Someone who heard about Workers Rights Watch and wants to learn more

```mermaid
graph TD
    Start[Visitor Arrives<br/>Google Search or Social Media] --> Home[HOME PAGE<br/>First Impression]
    
    Home --> ScrollDown{Scrolls Down<br/>Exploring Content}
    
    ScrollDown --> SeeImpact[Sees Impact Stats<br/>50,000+ Workers Helped<br/>1,500+ Cases]
    SeeImpact --> Impressed[Impressed by Results]
    
    Impressed --> ClickMission[Clicks 'Our Mission' Button]
    ClickMission --> About[ABOUT US PAGE<br/>Reads Vision & Mission]
    
    About --> LearnMore[Reads 'What We Do'<br/>Understands Approach]
    LearnMore --> CoreValues[Sees Core Values<br/>Dignity, Justice, Transparency]
    
    CoreValues --> ExplorePrograms[Clicks to Our Programs]
    ExplorePrograms --> Programs[OUR PROGRAMS PAGE<br/>Sees Detailed Initiatives]
    
    Programs --> MeetTeam{Wants to Know<br/>Who Runs This}
    MeetTeam --> Team[OUR TEAM PAGE<br/>Leadership & Board]
    
    Team --> ClickProfile[Clicks Eunice's Profile<br/>Reads Bio]
    ClickProfile --> Convinced[Convinced of Credibility]
    
    Convinced --> Decision{What Next?}
    
    Decision --> Donate[Wants to Support<br/>→ DONATE PAGE]
    Decision --> Contact[Has Questions<br/>→ CONTACT PAGE]
    Decision --> Share[Shares on Social Media]
    Decision --> Bookmark[Bookmarks for Later]
    
    style Start fill:#D6E9E9,stroke:#000,stroke-width:2px
    style Convinced fill:#90EE90,stroke:#000,stroke-width:2px
    style Donate fill:#10bfae,stroke:#000,stroke-width:2px,color:#fff
    style Contact fill:#10bfae,stroke:#000,stroke-width:2px,color:#fff
```

**Time on Site:** 5-10 minutes  
**Pages Viewed:** 4-6 pages  
**Conversion Goal:** Donor, contact submission, or social share

---

## User Flow 2: Donor Who Wants to Contribute

**User Type:** Someone ready to donate (from social media, email campaign, or referral)

```mermaid
graph TD
    Start[Arrives via Link<br/>'Donate to WRW'] --> HomeDirect[Lands on HOME PAGE<br/>or Direct to DONATE]
    
    HomeDirect --> ScanPage{Quickly Scans<br/>Impact & Credibility}
    
    ScanPage --> SeeStats[Sees 50,000+ Workers Helped<br/>1,500+ Legal Cases]
    SeeStats --> ViewPartners[Sees Partner Logos<br/>Recognizes Organizations]
    ViewPartners --> TrustBuilt[Trust Established]
    
    TrustBuilt --> ClickDonate[Clicks Green 'DONATE' Button<br/>in Navigation]
    
    ClickDonate --> DonatePage[DONATE PAGE<br/>Under Construction Notice]
    
    DonatePage --> SeesStatus{Sees Page Status}
    
    SeesStatus --> Disappointed[Currently Under Construction<br/>Message Displayed]
    Disappointed --> Alternative[Seeks Alternative]
    
    Alternative --> ContactInstead[Goes to CONTACT PAGE<br/>Asks About Donation]
    Alternative --> EmailDirect[Emails Directly<br/>info@workersrightswatch.org]
    Alternative --> WillReturn[Bookmarks & Will Return<br/>When Active]
    
    style Start fill:#D6E9E9,stroke:#000,stroke-width:2px
    style TrustBuilt fill:#90EE90,stroke:#000,stroke-width:2px
    style Disappointed fill:#FFB6C1,stroke:#000,stroke-width:2px
```

**Current Experience:** Donor cannot complete donation online yet  
**Future Experience (Once Active):** See "User Flow 2B" below

### User Flow 2B: Donor Experience (When Donation System is Active)

```mermaid
graph TD
    Start[Clicks DONATE Button] --> DonatePage[DONATE PAGE<br/>Active System]
    
    DonatePage --> AutoDetect[System Detects Country<br/>Sets Currency KES]
    AutoDetect --> ViewAmounts[Sees Preset Amounts<br/>KSh 1,000, 2,500, 5,000, 10,000]
    
    ViewAmounts --> ChooseAmount{Selects Amount}
    
    ChooseAmount --> Preset[Clicks KSh 2,500]
    ChooseAmount --> Custom[Clicks Custom<br/>Enters KSh 3,000]
    
    Preset --> SelectPayment{Select Payment Method}
    Custom --> SelectPayment
    
    SelectPayment --> Mpesa[M-Pesa<br/>Most Common in Kenya]
    SelectPayment --> Card[Credit Card<br/>Stripe]
    SelectPayment --> PayPal[PayPal<br/>International]
    
    Mpesa --> EnterPhone[Enters M-Pesa Phone<br/>0712345678]
    EnterPhone --> EnterInfo[Enters Name & Email]
    EnterInfo --> ClickPay[Clicks 'Donate Now']
    ClickPay --> MpesaPrompt[Receives M-Pesa Prompt<br/>on Phone]
    MpesaPrompt --> EnterPin[Enters M-Pesa PIN<br/>Confirms Payment]
    EnterPin --> Success[✓ Payment Successful]
    
    Card --> CardInfo[Enters Card Details<br/>via Stripe]
    CardInfo --> CardName[Enters Name & Email]
    CardName --> ProcessCard[Clicks 'Donate Now'<br/>Card Processed Securely]
    ProcessCard --> Success
    
    PayPal --> PayPalInfo[Enters Name & Email]
    PayPalInfo --> RedirectPP[Redirects to PayPal]
    RedirectPP --> PayPalLogin[Logs into PayPal<br/>Confirms Payment]
    PayPalLogin --> Success
    
    Success --> Receipt[Receives Email Receipt<br/>with Tax Info]
    Success --> ThankYou[Thank You Page<br/>Confirmation Message]
    ThankYou --> ShareOption[Option to Share<br/>on Social Media]
    
    ShareOption --> ShareSocial[Shares 'I Donated to WRW'<br/>Facebook/Twitter]
    ShareOption --> Browse[Continues Browsing<br/>Website]
    ShareOption --> Exit[Exits Satisfied]
    
    style Success fill:#90EE90,stroke:#000,stroke-width:3px
    style Receipt fill:#90EE90,stroke:#000,stroke-width:2px
```

**Time on Site:** 3-5 minutes  
**Pages Viewed:** 1-2 pages  
**Conversion Goal:** Completed donation

---

## User Flow 3: Job Seeker Looking for Employment

**User Type:** Professional interested in working for WRW

```mermaid
graph TD
    Start[Finds Job Post<br/>LinkedIn, Indeed, or WRW Twitter] --> Clicks[Clicks Link to Website]
    
    Clicks --> CareersPage[CAREERS PAGE<br/>Job Opportunities Tab]
    
    CareersPage --> BrowseJobs[Sees Job Listings<br/>Cards with Summary]
    
    BrowseJobs --> FindInterest[Finds Interesting Position<br/>'Programs Officer']
    FindInterest --> ClickDetails[Clicks 'View Details & Apply']
    
    ClickDetails --> JobPopup[Job Details Popup Opens<br/>Full Description]
    
    JobPopup --> ReadDesc[Reads Job Description<br/>Responsibilities<br/>Requirements]
    
    ReadDesc --> Decision{Am I Qualified?}
    
    Decision --> NotQualified[Not Qualified<br/>Closes Popup]
    NotQualified --> BrowseMore[Browses Other Jobs]
    BrowseMore --> CheckVolunteer[Checks Volunteer Tab<br/>Alternative Option]
    
    Decision --> Qualified[Yes, Qualified<br/>Wants to Apply]
    
    Qualified --> ScrollForm[Scrolls to Application Form<br/>Within Popup]
    
    ScrollForm --> FillName[Enters Full Name]
    FillName --> FillEmail[Enters Email]
    FillEmail --> FillPhone[Enters Phone Number]
    FillPhone --> WriteCover[Writes Cover Letter<br/>3-4 Paragraphs]
    WriteCover --> UploadCV[Uploads CV<br/>Drag & Drop PDF]
    
    UploadCV --> Review{Reviews Application}
    
    Review --> EditSomething[Edits Cover Letter<br/>Makes Changes]
    EditSomething --> Review
    
    Review --> Submit[Clicks 'Submit Application']
    
    Submit --> Validation{Form Validates}
    
    Validation --> MissingField[Error: Missing Phone<br/>Shows Red Message]
    MissingField --> FillPhone
    
    Validation --> Success[✓ Application Submitted<br/>Success Message]
    
    Success --> ConfirmEmail[Receives Confirmation Email<br/>'We Received Your Application']
    Success --> WRWNotified[WRW Team Receives Email<br/>with CV Attached]
    
    Success --> NextSteps[Sees Next Steps Message<br/>'We'll Contact Within 2 Weeks']
    
    NextSteps --> ExploreSite[Explores More of Website<br/>While Waiting]
    ExploreSite --> ReadAbout[Reads About Page<br/>Learns More About WRW]
    ReadAbout --> Exit[Exits & Waits for Response]
    
    style Success fill:#90EE90,stroke:#000,stroke-width:3px
    style ConfirmEmail fill:#90EE90,stroke:#000,stroke-width:2px
    style MissingField fill:#FFB6C1,stroke:#000,stroke-width:2px
```

**Time on Site:** 10-20 minutes  
**Pages Viewed:** 2-4 pages  
**Conversion Goal:** Job application submitted

---

## User Flow 4: Researcher Seeking Information

**User Type:** Student, journalist, or partner organization researching workers' rights in Kenya

```mermaid
graph TD
    Start[Google Search<br/>'workers rights Kenya report'] --> SearchResults[WRW Appears in Results<br/>Clicks Link]
    
    SearchResults --> LandsResources[Lands on RESOURCES PAGE<br/>Reports Tab]
    
    LandsResources --> SeeReports[Sees 4 PDF Reports<br/>with Cover Images]
    
    SeeReports --> BrowseOptions[Browses Report Titles<br/>& Descriptions]
    
    BrowseOptions --> Interest[Interested in<br/>'WRW Impact Report'<br/>3.8 MB PDF]
    
    Interest --> CheckSize[Checks File Size<br/>3.8 MB - Large but OK]
    
    CheckSize --> Decision{Download or View Online?}
    
    Decision --> ViewOnline[Clicks 'View Online'<br/>Opens in New Tab]
    ViewOnline --> ReadOnline[Reads Report Online<br/>in Browser PDF Viewer]
    ReadOnline --> Helpful{Found What Needed?}
    
    Decision --> Download[Clicks 'Download Report'<br/>PDF Downloads]
    Download --> OpenPDF[Opens PDF on Computer]
    OpenPDF --> ReadOffline[Reads Report<br/>Takes Notes]
    ReadOffline --> Helpful
    
    Helpful --> Yes[Yes, Very Useful]
    Helpful --> No[No, Needs More Info]
    
    Yes --> DownloadMore[Downloads Another Report<br/>'Sexual Harassment Report']
    DownloadMore --> CheckVideos[Checks Videos Tab<br/>Finds Documentary]
    CheckVideos --> WatchVideo[Clicks Play<br/>Opens YouTube Video]
    
    WatchVideo --> Satisfied[Gets Complete Picture<br/>of WRW Work]
    
    No --> UseSearch[Uses Search Bar<br/>Searches 'gender equality']
    UseSearch --> FilteredResults[Sees Filtered Results<br/>Across All Resource Types]
    FilteredResults --> FindsArticle[Finds Relevant Article<br/>Clicks 'Read More']
    FindsArticle --> ArticlePopup[Reads Full Article<br/>in Popup]
    ArticlePopup --> Satisfied
    
    Satisfied --> Contact{Needs Interview/More Info?}
    
    Contact --> YesContact[Goes to CONTACT PAGE<br/>Fills Form]
    YesContact --> SendsMessage[Sends Message<br/>'Media Request']
    SendsMessage --> Receives[Receives Confirmation<br/>WRW Will Respond]
    
    Contact --> NoContact[Has Enough Info<br/>Cites in Research]
    
    NoContact --> Bookmark[Bookmarks Resources Page<br/>For Future Reference]
    Bookmark --> Exit[Exits Satisfied]
    
    Receives --> Exit
    
    style Satisfied fill:#90EE90,stroke:#000,stroke-width:3px
    style Receives fill:#90EE90,stroke:#000,stroke-width:2px
```

**Time on Site:** 15-30 minutes  
**Pages Viewed:** 3-5 pages  
**Conversion Goal:** Downloaded resources, potential contact for interview

---

## User Flow 5: Worker Seeking Legal Help

**User Type:** Worker experiencing rights violations needing assistance

```mermaid
graph TD
    Start[Worker Hears About WRW<br/>from Colleague or Poster] --> Search[Searches on Google<br/>'workers rights help Kenya']
    
    Search --> FindsSite[Finds WRW Website<br/>Clicks Result]
    
    FindsSite --> Home[HOME PAGE<br/>Reads Headline]
    
    Home --> SeesFocus[Sees 'Legal Support'<br/>in Focus Areas]
    SeesFocus --> Hopeful[Feels Hopeful<br/>This Might Help]
    
    Hopeful --> ExploreOptions{Where to Find Help?}
    
    ExploreOptions --> NavPrograms[Clicks 'Our Programs'<br/>in Navigation]
    NavPrograms --> Programs[OUR PROGRAMS PAGE<br/>Reads Legal Aid Section]
    Programs --> SeesServices[Sees 'Free Legal Aid'<br/>'Case Representation']
    SeesServices --> NeedsContact[Needs to Contact WRW]
    
    ExploreOptions --> NavContact[Clicks 'Contact' in Nav<br/>Direct Approach]
    NavContact --> Contact[CONTACT PAGE<br/>Contact Form]
    
    NeedsContact --> Contact
    
    Contact --> ReadOptions[Sees Contact Options<br/>Form, Phone, Email]
    
    ReadOptions --> DecideMethod{Choose Contact Method}
    
    DecideMethod --> UseForm[Fills Contact Form]
    UseForm --> SelectSubject[Selects 'Legal Support'<br/>from Dropdown]
    SelectSubject --> EnterName[Enters Name]
    EnterName --> EnterEmail[Enters Email]
    EnterEmail --> EnterPhone[Enters Phone]
    EnterPhone --> WriteMessage[Writes Message<br/>Describes Situation]
    WriteMessage --> SubmitForm[Clicks 'Send Message']
    SubmitForm --> FormSuccess[✓ Message Sent<br/>Confirmation Shown]
    FormSuccess --> EmailConf[Receives Auto-Reply<br/>'We Received Your Message']
    EmailConf --> WRWGets[WRW Team Gets Email<br/>Will Respond Within 48hrs]
    
    DecideMethod --> CallPhone[Sees Phone Number<br/>Prefers to Call]
    CallPhone --> MakesCall[Calls WRW Office<br/>Speaks to Staff]
    MakesCall --> GetsHelp[Gets Immediate Info<br/>or Scheduled Appointment]
    
    DecideMethod --> SendEmail[Sees Email Address<br/>Sends Direct Email]
    SendEmail --> EmailSent[Emails from Personal Account<br/>Detailed Explanation]
    EmailSent --> WRWGets
    
    WRWGets --> WaitResponse[Worker Waits<br/>for Response]
    WaitResponse --> ResponseReceived[Receives Response<br/>within 48 Hours]
    ResponseReceived --> NextSteps[Gets Next Steps<br/>Meeting Scheduled or<br/>Referred to Lawyer]
    
    GetsHelp --> NextSteps
    
    NextSteps --> Assisted[Worker Gets Assistance<br/>Case Opens]
    
    style FormSuccess fill:#90EE90,stroke:#000,stroke-width:3px
    style Assisted fill:#90EE90,stroke:#000,stroke-width:3px
```

**Time on Site:** 5-10 minutes  
**Pages Viewed:** 2-4 pages  
**Conversion Goal:** Contact submission, phone call made

---

## User Flow 6: Social Media Follower

**User Type:** Someone who follows WRW on Twitter/X and clicks a link

```mermaid
graph TD
    Start[Scrolling Twitter Feed<br/>Following @Workersrights24] --> SeeTweet[Sees WRW Tweet<br/>'Check our latest Impact Report']
    
    SeeTweet --> Interested[Interested in Content<br/>Clicks Link in Tweet]
    
    Interested --> DirectHome[Arrives on HOME PAGE<br/>via Twitter Link]
    
    DirectHome --> ScrollsToTweets[Scrolls Down<br/>to Twitter Feed Section]
    
    ScrollsToTweets --> SeesFeed[Sees Embedded Tweets<br/>3 Latest Tweets Displayed]
    
    SeesFeed --> LoadMore[Clicks 'Load More'<br/>Sees More Tweets]
    
    LoadMore --> EngageTweet[Clicks Tweet<br/>Opens on Twitter]
    EngageTweet --> BackToSite[Returns to WRW Site]
    
    BackToSite --> ExploreMore{Curious About WRW}
    
    ExploreMore --> AboutNav[Clicks 'About Us'<br/>in Navigation]
    AboutNav --> About[ABOUT US PAGE<br/>Learns Organization Story]
    
    About --> Convinced[Impressed by Mission<br/>Wants to Support]
    
    Convinced --> FollowAction{Chooses Action}
    
    FollowAction --> FollowMore[Already Following<br/>Shares Tweet]
    FollowAction --> DonateLater[Bookmarks Donate Page<br/>Plans to Give Later]
    FollowAction --> Volunteer[Interested in Helping<br/>Goes to Careers Page]
    
    Volunteer --> CareersPage[CAREERS PAGE<br/>Volunteer Tab]
    CareersPage --> FillsVolApp[Fills Volunteer Application<br/>Remote Work Option]
    FillsVolApp --> SubmitVol[Submits Application]
    SubmitVol --> VolSuccess[✓ Application Received<br/>Will Be Contacted]
    
    style VolSuccess fill:#90EE90,stroke:#000,stroke-width:3px
```

**Time on Site:** 5-15 minutes  
**Pages Viewed:** 2-5 pages  
**Conversion Goal:** Deeper engagement, volunteer application, social share

---

## User Flow 7: Partner Organization Representative

**User Type:** Staff from partner NGO or potential partner exploring collaboration

```mermaid
graph TD
    Start[Receives Email/Referral<br/>About WRW Partnership] --> VisitSite[Visits Website<br/>to Research Organization]
    
    VisitSite --> Home[HOME PAGE<br/>First Assessment]
    
    Home --> CheckPartners[Scrolls to Partners Section<br/>Sees 18+ Partner Logos]
    
    CheckPartners --> RecognizesOrgs[Recognizes Several Partners<br/>'They work with reputable orgs']
    
    RecognizesOrgs --> CheckCredibility{Assess Credibility}
    
    CheckCredibility --> AboutUs[Goes to ABOUT US<br/>Reads Mission & Vision]
    AboutUs --> CheckPrograms[Goes to OUR PROGRAMS<br/>Reviews Initiatives]
    CheckPrograms --> CheckTeam[Goes to OUR TEAM<br/>Checks Leadership]
    
    CheckTeam --> ReviewProfiles[Clicks Team Member Profiles<br/>Reads Bios & Experience]
    
    ReviewProfiles --> CheckResources[Goes to RESOURCES<br/>Downloads Impact Report]
    
    CheckResources --> ReadReport[Reads Impact Report<br/>Analyzes Data & Results]
    
    ReadReport --> Impressed[Impressed by<br/>Track Record & Transparency]
    
    Impressed --> Decision{Proceed with Partnership?}
    
    Decision --> YesPartner[Yes, Want to Discuss<br/>Goes to CONTACT PAGE]
    YesPartner --> SelectSubject[Selects 'Partnership'<br/>from Subject Dropdown]
    SelectSubject --> DetailedMessage[Writes Detailed Message<br/>Partnership Proposal]
    DetailedMessage --> SendsContact[Submits Contact Form]
    SendsContact --> ContactSuccess[✓ Message Sent<br/>WRW Will Respond]
    ContactSuccess --> FollowUp[Waits for Response<br/>Follow-up Meeting Scheduled]
    
    Decision --> Maybe[Need More Info<br/>Saves for Later]
    Maybe --> DownloadsReports[Downloads Multiple Reports<br/>Shares with Team]
    DownloadsReports --> InternalReview[Internal Review<br/>Will Contact Later]
    
    Decision --> NoPartner[Not Right Fit<br/>But Respects Work]
    NoPartner --> Share[Shares Website<br/>with Other NGOs]
    Share --> Exit[Exits Site]
    
    style ContactSuccess fill:#90EE90,stroke:#000,stroke-width:3px
```

**Time on Site:** 20-40 minutes  
**Pages Viewed:** 6-10 pages  
**Conversion Goal:** Partnership inquiry submitted

---

## User Flow Summary Table

| User Type | Entry Point | Primary Goal | Key Pages | Avg Time | Conversion |
|-----------|-------------|--------------|-----------|----------|------------|
| **First-Time Visitor** | Google, Social Media | Learn about WRW | Home, About, Team | 5-10 min | Donation or Contact |
| **Donor** | Email campaign, Social | Make donation | Home, Donate | 3-5 min | Completed donation |
| **Job Seeker** | LinkedIn, Indeed | Apply for job | Careers | 10-20 min | Job application |
| **Researcher** | Google search | Find information | Resources | 15-30 min | Downloaded reports |
| **Worker Seeking Help** | Word of mouth, Google | Get legal assistance | Home, Programs, Contact | 5-10 min | Contact submission |
| **Social Media Follower** | Twitter/X | Engage with content | Home, About | 5-15 min | Volunteer app, Share |
| **Partner Org** | Email, Referral | Assess partnership | All pages | 20-40 min | Partnership inquiry |

---

## Mobile vs Desktop User Behavior

### Mobile User (60-70% of visitors)

```mermaid
graph LR
    Mobile[Mobile User] --> QuickScan[Quick Scan<br/>Scrolling Thumb]
    QuickScan --> KeyInfo[Finds Key Info Fast<br/>Contact, Donate]
    KeyInfo --> ShortSession[Shorter Session<br/>3-5 minutes]
    ShortSession --> Return[May Return on Desktop<br/>for Detailed Tasks]
```

**Mobile Optimizations on Site:**
- Hamburger menu for easy navigation
- Large, tap-friendly buttons
- Optimized images load fast on 3G/4G
- Forms work well with phone keyboard
- Click-to-call phone numbers

### Desktop User (30-40% of visitors)

```mermaid
graph LR
    Desktop[Desktop User] --> DeepDive[Deep Exploration<br/>Multiple Tabs]
    DeepDive --> ReadMore[Reads Full Content<br/>Downloads Files]
    ReadMore --> LongSession[Longer Session<br/>10-20 minutes]
    LongSession --> ComplexTasks[Completes Complex Tasks<br/>Applications, Forms]
```

**Desktop Advantages:**
- Full navigation menu visible
- Multiple resource tabs open
- Easier form filling
- Better for reading long reports
- Side-by-side comparison

---

*These user flow diagrams help understand how different visitors navigate the website and achieve their goals. This informs future improvements and content updates.*

