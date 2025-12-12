# Workers Rights Watch Website Structure

## Complete Site Map

This diagram shows how all pages connect and the main sections within each page.

```mermaid
graph TB
    Home[🏠 HOME PAGE<br/>Main Landing]
    
    Home --> About[📖 ABOUT US<br/>Vision, Mission, Values]
    Home --> Team[👥 OUR TEAM<br/>Leadership & Board]
    Home --> Programs[🎯 OUR PROGRAMS<br/>What We Do]
    Home --> Work[💼 OUR WORK<br/>How We Do It]
    Home --> Resources[📚 RESOURCES<br/>Knowledge Hub]
    Home --> Activities[🎉 ACTIVITIES<br/>Recent Events]
    Home --> Careers[💼 CAREERS<br/>Jobs & Volunteers]
    Home --> Contact[📞 CONTACT<br/>Get In Touch]
    Home --> Donate[💝 DONATE<br/>Support Us]
    
    style Home fill:#10bfae,stroke:#000,stroke-width:3px,color:#fff
    style About fill:#D6E9E9,stroke:#000,stroke-width:2px
    style Team fill:#D6E9E9,stroke:#000,stroke-width:2px
    style Programs fill:#D6E9E9,stroke:#000,stroke-width:2px
    style Work fill:#D6E9E9,stroke:#000,stroke-width:2px
    style Resources fill:#D6E9E9,stroke:#000,stroke-width:2px
    style Activities fill:#D6E9E9,stroke:#000,stroke-width:2px
    style Careers fill:#D6E9E9,stroke:#000,stroke-width:2px
    style Contact fill:#D6E9E9,stroke:#000,stroke-width:2px
    style Donate fill:#EDCEC5,stroke:#000,stroke-width:2px
```

---

## Detailed Page Structure

### Home Page Sections

```mermaid
graph TD
    Home[HOME PAGE] --> TopHeader[Top Header Bar<br/>Social Media & Contact]
    Home --> Marquee[Animated Marquee Banner<br/>Key Messages]
    Home --> Hero[Hero Section<br/>Carousel & CTA Buttons]
    Home --> Focus[Focus Areas<br/>5 Core Areas]
    Home --> Impact[Impact Statistics<br/>4 Animated Counters]
    Home --> Gallery[Photo Gallery Preview<br/>4 Featured Photos]
    Home --> LatestRes[Latest Resources<br/>Articles, Reports, Videos]
    Home --> Partners[Partners Section<br/>18+ Organization Logos]
    Home --> Twitter[Twitter Feed<br/>Latest 3 Tweets]
    Home --> CTA[Join Our Cause<br/>Donation Call-to-Action]
    Home --> Footer[Footer<br/>Links & Contact Info]
    
    Hero --> HeroBtn1[Our Mission Button]
    Hero --> HeroBtn2[Get Involved Button]
    HeroBtn1 --> About[ABOUT US PAGE]
    HeroBtn2 --> Contact[CONTACT PAGE]
    
    Gallery --> ViewGallery[View Full Gallery Button]
    ViewGallery --> Resources[RESOURCES PAGE]
    
    CTA --> DonateBtn[Donate Now Button]
    DonateBtn --> Donate[DONATE PAGE]
    
    style Home fill:#10bfae,stroke:#000,stroke-width:3px,color:#fff
    style About fill:#EDCEC5,stroke:#000,stroke-width:2px
    style Contact fill:#EDCEC5,stroke:#000,stroke-width:2px
    style Resources fill:#EDCEC5,stroke:#000,stroke-width:2px
    style Donate fill:#EDCEC5,stroke:#000,stroke-width:2px
```

### Resources Page Structure (Most Complex)

```mermaid
graph TD
    Resources[RESOURCES PAGE] --> Search[Search Bar<br/>Global Search]
    Resources --> Tabs[5 Tabs System]
    
    Tabs --> Tab1[Articles Tab]
    Tabs --> Tab2[Reports Tab]
    Tabs --> Tab3[Videos Tab]
    Tabs --> Tab4[Training Manuals Tab]
    Tabs --> Tab5[Photo Gallery Tab]
    
    Tab1 --> Articles[1 Featured Article<br/>with Read More]
    Articles --> Popup1[Full Article Popup<br/>Image + Full Text]
    
    Tab2 --> Reports[4 PDF Reports<br/>949KB - 3.8MB]
    Reports --> Download[Download Button]
    Reports --> ViewOnline[View Online Button]
    
    Tab3 --> Videos[1 Video Showcase<br/>Thumbnail + Duration]
    Videos --> YouTube[Opens YouTube<br/>New Tab]
    
    Tab4 --> Manuals[1 Training Manual<br/>PDF Download]
    Manuals --> ManualDL[Download/View Options]
    
    Tab5 --> Gallery[12 Photos<br/>Categorized]
    Gallery --> GalleryPopup[Full-Screen Viewer<br/>Navigation Arrows]
    
    Search --> FilterResults[Filters All Content<br/>Real-time Results]
    
    Tab2 --> SortDate[Sort by Date<br/>Latest/Oldest]
    Tab1 --> FilterCat[Filter by Category<br/>Badge Buttons]
    Tab2 --> FilterCat
    Tab3 --> FilterCat
    Tab5 --> FilterCat
    
    style Resources fill:#10bfae,stroke:#000,stroke-width:3px,color:#fff
    style Tab5 fill:#EDCEC5,stroke:#000,stroke-width:2px
```

### Careers Page Structure

```mermaid
graph TD
    Careers[CAREERS PAGE] --> JobTab[Job Opportunities Tab]
    Careers --> VolTab[Volunteer Tab]
    
    JobTab --> JobCards[Job Listing Cards<br/>Title, Location, Type, Salary]
    JobCards --> JobDetails[View Details Button]
    JobDetails --> JobPopup[Job Details Popup<br/>Full Description]
    JobPopup --> AppForm[Application Form<br/>Name, Email, Phone, Cover Letter]
    AppForm --> CVUpload[CV Upload<br/>Drag & Drop]
    CVUpload --> Submit1[Submit Application]
    Submit1 --> Email1[Email to WRW Team<br/>with Attachments]
    
    VolTab --> VolForm[Volunteer Application Form<br/>Personal Details]
    VolForm --> WorkType[Work Type Selector<br/>Remote/On-site/Hybrid]
    WorkType --> CVUpload2[CV Upload]
    CVUpload2 --> Submit2[Submit Volunteer App]
    Submit2 --> Email2[Email to WRW Team]
    
    style Careers fill:#10bfae,stroke:#000,stroke-width:3px,color:#fff
```

### Donate Page Flow (Under Construction)

```mermaid
graph TD
    Donate[DONATE PAGE] --> DetectLocation[Auto-Detect Country<br/>IP-based]
    DetectLocation --> SelectCurrency[Select Currency<br/>10 Options]
    SelectCurrency --> ChooseAmount[Choose Amount<br/>Preset or Custom]
    ChooseAmount --> PaymentMethod{Select Payment Method}
    
    PaymentMethod --> Card[Credit/Debit Card<br/>Stripe]
    PaymentMethod --> Mpesa[M-Pesa<br/>Kenya Only]
    PaymentMethod --> PayPal[PayPal<br/>International]
    
    Card --> DonorInfo1[Enter Donor Info<br/>Name, Email, Phone]
    Mpesa --> DonorInfo2[Enter Donor Info<br/>+ M-Pesa Number]
    PayPal --> DonorInfo3[Enter Donor Info]
    
    DonorInfo1 --> ProcessCard[Process via Stripe<br/>Secure Payment]
    DonorInfo2 --> ProcessMpesa[Send M-Pesa Prompt<br/>Complete on Phone]
    DonorInfo3 --> ProcessPayPal[Redirect to PayPal<br/>Secure Payment]
    
    ProcessCard --> Success[Payment Success<br/>Confirmation]
    ProcessMpesa --> Success
    ProcessPayPal --> Success
    
    Success --> Receipt[Email Receipt<br/>to Donor]
    Success --> Notify[Notify WRW Team<br/>New Donation]
    
    style Donate fill:#EDCEC5,stroke:#000,stroke-width:3px
    style Success fill:#90EE90,stroke:#000,stroke-width:2px
```

---

## Navigation Hierarchy

```mermaid
graph TB
    Nav[MAIN NAVIGATION BAR] --> Logo[WRW Logo<br/>Click → Home]
    Nav --> MenuItems[Menu Items]
    Nav --> ThemeToggle[Theme Toggle<br/>Light/Dark]
    Nav --> DonateBtn[DONATE Button<br/>Green, Prominent]
    
    MenuItems --> Home[Home]
    MenuItems --> WhoWeAre[Who We Are ▼<br/>Dropdown]
    MenuItems --> OurPrograms[Our Programs]
    MenuItems --> ResourcesMenu[Resources ▼<br/>Dropdown]
    MenuItems --> Careers[Careers]
    MenuItems --> Contact[Contact]
    
    WhoWeAre --> About[About Us]
    WhoWeAre --> OurTeam[Our Team]
    WhoWeAre --> Board[Our Board]
    
    ResourcesMenu --> Articles[Articles]
    ResourcesMenu --> Reports[Reports]
    ResourcesMenu --> Videos[Videos]
    ResourcesMenu --> PhotoGallery[Photo Gallery]
    ResourcesMenu --> Manuals[Training Manuals]
    
    style Nav fill:#10bfae,stroke:#000,stroke-width:3px,color:#fff
    style DonateBtn fill:#CB3818,stroke:#000,stroke-width:2px,color:#fff
```

---

## Footer Structure

```mermaid
graph LR
    Footer[FOOTER SECTION] --> Col1[Quick Links<br/>All Pages]
    Footer --> Col2[Contact Info<br/>Phone, Email, Address]
    Footer --> Col3[Social Media<br/>5 Platforms]
    Footer --> Col4[Newsletter<br/>Coming Soon]
    
    Col3 --> Facebook[Facebook]
    Col3 --> Twitter[Twitter/X]
    Col3 --> LinkedIn[LinkedIn]
    Col3 --> Instagram[Instagram]
    Col3 --> YouTube[YouTube]
    
    Footer --> Copyright[Copyright Notice<br/>© 2025 Workers Rights Watch]
    
    style Footer fill:#23272A,stroke:#000,stroke-width:2px,color:#fff
```

---

## Mobile Navigation

```mermaid
graph TD
    Mobile[MOBILE VIEW] --> Hamburger[Hamburger Menu Icon ☰]
    Hamburger --> Click[User Taps Icon]
    Click --> OpenMenu[Slide-out Menu Opens]
    
    OpenMenu --> Logo[WRW Logo]
    OpenMenu --> WhoWeAre[Who We Are<br/>Expandable]
    OpenMenu --> Programs[Our Programs]
    OpenMenu --> ResourcesMobile[Resources<br/>Expandable]
    OpenMenu --> Careers[Careers]
    OpenMenu --> Contact[Contact]
    OpenMenu --> Donate[DONATE Button<br/>Full Width]
    OpenMenu --> Theme[Theme Toggle]
    
    WhoWeAre --> ExpandWho[+ Tap to Expand]
    ExpandWho --> About[- About Us]
    ExpandWho --> Team[- Our Team]
    ExpandWho --> Board[- Our Board]
    
    ResourcesMobile --> ExpandRes[+ Tap to Expand]
    ExpandRes --> Articles[- Articles]
    ExpandRes --> Reports[- Reports]
    ExpandRes --> Videos[- Videos]
    ExpandRes --> Photos[- Photo Gallery]
    ExpandRes --> Manuals[- Manuals]
    
    style Mobile fill:#10bfae,stroke:#000,stroke-width:3px,color:#fff
    style Donate fill:#CB3818,stroke:#000,stroke-width:2px,color:#fff
```

---

## Information Architecture Summary

### Level 1: Top Navigation (10 Main Sections)
1. Home
2. Who We Are (3 sub-pages)
3. Our Programs
4. Our Work
5. Resources (5 sub-sections)
6. Activities
7. Careers (2 tabs)
8. Contact
9. Donate

### Level 2: Sub-Sections
- **Who We Are:** About Us, Our Team, Our Board (3 pages)
- **Resources:** Articles, Reports, Videos, Manuals, Photos (5 tabs)
- **Careers:** Jobs, Volunteers (2 tabs)
- **Our Team:** Leadership, Board (2 tabs)

### Total Pages: 10 main pages
### Total Sections: 20+ unique content sections
### Interactive Elements: 50+ (forms, galleries, popups, filters)

---

## Page Interconnectivity

```mermaid
graph TD
    Any[Any Page] --> Header[Header Navigation<br/>Always Visible]
    Any --> Footer[Footer Links<br/>Always Visible]
    
    Header --> AllPages[Access All 10 Pages<br/>From Anywhere]
    Footer --> AllPages
    
    AllPages --> Home
    AllPages --> About
    AllPages --> Team
    AllPages --> Programs
    AllPages --> Work
    AllPages --> Resources
    AllPages --> Activities
    AllPages --> Careers
    AllPages --> Contact
    AllPages --> Donate
    
    Home --> InternalLinks[Internal Page Links<br/>Strategic Placement]
    InternalLinks --> OurMission[Our Mission Button → About]
    InternalLinks --> GetInvolved[Get Involved → Contact]
    InternalLinks --> ViewGallery[View Gallery → Resources]
    InternalLinks --> DonateNow[Donate Now → Donate]
    InternalLinks --> ViewPositions[View Positions → Careers]
    
    style Header fill:#10bfae,stroke:#000,stroke-width:2px,color:#fff
    style Footer fill:#23272A,stroke:#000,stroke-width:2px,color:#fff
```

---

*These diagrams can be viewed in any Markdown viewer that supports Mermaid diagrams (GitHub, VS Code, many documentation platforms).*

*For PDF conversion, screenshots of the rendered diagrams should be included.*

