(function () {
  if (window.TechnorizenChatWidgetLoaded) {
    return;
  }

  window.TechnorizenChatWidgetLoaded = true;

  var config = window.TechnorizenChatWidgetConfig || {};
  var title = config.title || "Technorizen Assistant";
  var subtitle = config.subtitle || "Building Future Technologies";
  var statusText = config.statusText || "Online";
  var introTitle = config.introTitle || "Welcome to Technorizen Software Solutions Pvt Ltd";
  var introText = config.introText || "We help businesses with cutting-edge digital solutions.";
  var primaryColor = config.primaryColor || "#ff6b2c";
  var logoUrl = config.logoUrl || "";
  var chatSubmitUrl = config.chatSubmitUrl || "";
  var iconImageMap = config.iconImageMap || {};
  var assetBaseUrl = getAssetBaseUrl();
  var positionCookieName = config.positionCookieName || "trz_chat_widget_position_v6";
  var defaultRightOffset = typeof config.defaultRightOffset === "number" ? config.defaultRightOffset : 40;
  var defaultBottomOffset = typeof config.defaultBottomOffset === "number" ? config.defaultBottomOffset : 40;
  var defaultMobileOffset = typeof config.defaultMobileOffset === "number" ? config.defaultMobileOffset : 16;
  var services = config.services || [
    { icon: "globe", label: "Web Development" },
    { icon: "phone", label: "Mobile App Development" },
    { icon: "ai", label: "AI/ML Tech Solutions" },
    { icon: "chain", label: "Blockchain Development" },
    { icon: "ux", label: "UI/UX Design Services" },
    { icon: "cloud", label: "Cloud & DevOps Services" }
  ];
  var leadQuestions = [
    "Please describe your project briefly.",
    "What's your estimated budget?",
    "Please share your email or WhatsApp number."
  ];
  var commonServiceOptions = [
    "Web Development",
    "Mobile App Development",
    "AI/ML Tech Solutions",
    "Blockchain Development",
    "UI/UX Design Services",
    "Cloud & DevOps Services",
    "Start Project",
    "Get Quote"
  ];
  var countryCodeOptions = [
    { value: "+1", label: "USA (+1)" },
    { value: "+44", label: "UK (+44)" },
    { value: "+91", label: "India (+91)" },
    { value: "+61", label: "Australia (+61)" },
    { value: "+971", label: "UAE (+971)" },
    { value: "+966", label: "Saudi Arabia (+966)" },
    { value: "+974", label: "Qatar (+974)" },
    { value: "+968", label: "Oman (+968)" },
    { value: "+965", label: "Kuwait (+965)" },
    { value: "+973", label: "Bahrain (+973)" },
    { value: "+65", label: "Singapore (+65)" },
    { value: "+60", label: "Malaysia (+60)" },
    { value: "+66", label: "Thailand (+66)" },
    { value: "+81", label: "Japan (+81)" },
    { value: "+82", label: "South Korea (+82)" },
    { value: "+86", label: "China (+86)" },
    { value: "+49", label: "Germany (+49)" },
    { value: "+33", label: "France (+33)" },
    { value: "+39", label: "Italy (+39)" },
    { value: "+34", label: "Spain (+34)" },
    { value: "+31", label: "Netherlands (+31)" },
    { value: "+41", label: "Switzerland (+41)" },
    { value: "+46", label: "Sweden (+46)" },
    { value: "+47", label: "Norway (+47)" },
    { value: "+45", label: "Denmark (+45)" },
    { value: "+27", label: "South Africa (+27)" },
    { value: "+234", label: "Nigeria (+234)" },
    { value: "+254", label: "Kenya (+254)" },
    { value: "+20", label: "Egypt (+20)" },
    { value: "+92", label: "Pakistan (+92)" },
    { value: "+880", label: "Bangladesh (+880)" },
    { value: "+94", label: "Sri Lanka (+94)" },
    { value: "+977", label: "Nepal (+977)" },
    { value: "+975", label: "Bhutan (+975)" },
    { value: "+93", label: "Afghanistan (+93)" },
    { value: "+7", label: "Russia (+7)" },
    { value: "+55", label: "Brazil (+55)" },
    { value: "+52", label: "Mexico (+52)" },
    { value: "+54", label: "Argentina (+54)" },
    { value: "+1", label: "Canada (+1)" }
  ];
  var studentQuestions = [
    "Please share your full name and contact number.",
    "Please share your educational detail.",
    "Which course are you interested in?"
  ];
  var careerQuestions = [
    "Please share your full name, contact number, and email address.",
    "Which job role are you applying for?",
    "Please share your experience, skills, and current location."
  ];
  var structuredFlowFields = {
    common: [
      [
        {
          name: "service_interest",
          label: "Service",
          type: "select",
          options: commonServiceOptions,
          selectPlaceholder: "Select service"
        }
      ],
      [
        { name: "first_name", label: "First Name", type: "text", placeholder: "Enter first name" },
        { name: "last_name", label: "Last Name", type: "text", placeholder: "Enter last name" },
        { name: "country_code", label: "Country Code", type: "select", options: countryCodeOptions, value: "+91", selectPlaceholder: "Select country code" },
        { name: "mobile_number", label: "Mobile Number", type: "tel", placeholder: "Enter mobile number", inputmode: "numeric", pattern: "^[0-9]{7,15}$", digitsOnly: true, maxlength: 15 },
        { name: "email", label: "Email Address", type: "email", placeholder: "Enter email address" }
      ],
      [
        { name: "email", label: "Email Address", type: "email", placeholder: "Enter email address" },
        { name: "company_name", label: "Company Name", type: "text", placeholder: "Enter company name" }
      ],
      [
        { name: "project_type", label: "Project Type", type: "select", options: ["New Project", "Existing Project Upgrade", "Support & Maintenance", "Consultation"], selectPlaceholder: "Select project type" },
        { name: "budget", label: "Estimated Budget", type: "select", options: ["Below $1,000", "$1,000 - $5,000", "$5,000 - $10,000", "$10,000 - $20,000", "$20,000+"], selectPlaceholder: "Select budget" }
      ],
      [
        { name: "project_brief", label: "Project Brief", type: "textarea", placeholder: "Describe your requirements briefly" }
      ]
    ],
    student: [
      [
        { name: "first_name", label: "First Name", type: "text", placeholder: "Enter first name" },
        { name: "last_name", label: "Last Name", type: "text", placeholder: "Enter last name" },
        { name: "country_code", label: "Country Code", type: "select", options: countryCodeOptions, value: "+91", selectPlaceholder: "Select country code" },
        { name: "mobile_number", label: "Mobile Number", type: "tel", placeholder: "Enter mobile number", inputmode: "numeric", pattern: "^[0-9]{7,15}$", digitsOnly: true, maxlength: 15 },
        { name: "email", label: "Email Address", type: "email", placeholder: "Enter email address" }
      ],
      [
        {
          name: "education",
          label: "Educational Detail",
          type: "select",
          options: [
            "10th Pass",
            "12th Pass",
            "Diploma",
            "BCA",
            "MCA",
            "B.Tech",
            "M.Tech",
            "B.Sc",
            "M.Sc",
            "B.Com",
            "Other"
          ],
          selectPlaceholder: "Select education"
        }
      ],
      [
        {
          name: "course",
          label: "Interested Course",
          type: "select",
          options: [
            "Full Stack Development",
            "Web Development",
            "Mobile App Development",
            "React Native",
            "UI/UX Design Services",
            "Digital Marketing",
            "Data Science / AI/ML",
            "Cloud & DevOps Services"
          ]
        }
      ]
    ],
    career: [
      [
        { name: "first_name", label: "First Name", type: "text", placeholder: "Enter first name" },
        { name: "last_name", label: "Last Name", type: "text", placeholder: "Enter last name" },
        { name: "country_code", label: "Country Code", type: "select", options: countryCodeOptions, value: "+91", selectPlaceholder: "Select country code" },
        { name: "mobile_number", label: "Mobile Number", type: "tel", placeholder: "Enter mobile number", inputmode: "numeric", pattern: "^[0-9]{7,15}$", digitsOnly: true, maxlength: 15 },
        { name: "email", label: "Email Address", type: "email", placeholder: "Enter email address" }
      ],
      [
        {
          name: "job_role",
          label: "Applying For",
          type: "select",
          options: [
            "Laravel Developer",
            "PHP Developer",
            "Frontend Developer",
            "React Developer",
            "Full Stack Developer",
            "UI/UX Designer",
            "QA Tester",
            "Digital Marketing Executive",
            "Business Development Executive",
            "Internship"
          ],
          selectPlaceholder: "Select job role"
        }
      ],
      [
        { name: "experience", label: "Experience", type: "select", options: ["Fresher", "0-1 Year", "1-3 Years", "3-5 Years", "5+ Years"], selectPlaceholder: "Select experience" },
        { name: "current_ctc", label: "Current CTC", type: "tel", placeholder: "Enter current CTC", inputmode: "numeric", pattern: "^[0-9]{1,10}$", digitsOnly: true, maxlength: 10 },
        { name: "expected_ctc", label: "Expected CTC", type: "tel", placeholder: "Enter expected CTC", inputmode: "numeric", pattern: "^[0-9]{1,10}$", digitsOnly: true, maxlength: 10 },
        { name: "skills", label: "Skills", type: "text", placeholder: "Example: Laravel, MySQL, Figma" },
        { name: "location", label: "Current Location", type: "text", placeholder: "Enter current city" },
        { name: "resume", label: "Upload Resume (PDF, DOC)", type: "file", accept: ".pdf,.doc,.docx" }
      ]
    ]
  };

  var style = document.createElement("style");
  style.textContent =
    ".trz-chat-widget,.trz-chat-widget *{box-sizing:border-box}" +
    ".trz-chat-widget{position:fixed;right:40px;bottom:40px;z-index:99999;font-family:Segoe UI,Arial,sans-serif;display:flex;flex-direction:column;align-items:flex-end;width:min(372px,calc(100vw - 32px),calc(100dvw - 32px));max-width:calc(100vw - 32px);max-width:calc(100dvw - 32px)}" +
    ".trz-chat-panel{position:absolute;right:0;bottom:72px;width:100%;max-width:none;background:radial-gradient(circle at top,#123972 0%,#091937 42%,#050f23 100%);border-radius:24px;box-shadow:0 22px 56px rgba(3,10,30,.58);border:1px solid rgba(96,165,250,.22);overflow:hidden;display:none}" +
    ".trz-chat-panel.trz-open{display:block}" +
    ".trz-chat-widget .trz-chat-panel{right:0;left:auto;bottom:72px;top:auto}" +
    ".trz-chat-widget.trz-panel-open .trz-chat-panel{bottom:0}" +
    ".trz-chat-topbar{padding:14px 16px;background:#ffffff;border-bottom:1px solid rgba(15,23,42,.08);box-shadow:0 10px 24px rgba(15,23,42,.08)}" +
    ".trz-chat-brand{display:grid;grid-template-columns:150px minmax(0,1fr) 32px;align-items:center;gap:12px}" +
    ".trz-chat-menu{width:32px;height:32px;border:none;border-radius:999px;background:#eef4ff;color:#0b2f72;font-size:16px;cursor:pointer;flex:0 0 auto}" +
    ".trz-chat-logo{width:150px;height:52px;display:flex;align-items:center;justify-content:flex-start;flex:0 0 auto;padding:8px 10px 8px 4px;border-radius:0;background:transparent;border-right:1px solid rgba(15,23,42,.12)}" +
    ".trz-chat-logo img{max-width:100%;max-height:100%;object-fit:contain;display:block;filter:drop-shadow(0 10px 20px rgba(3,10,30,.26))}" +
    ".trz-chat-logo-fallback{display:inline-flex;align-items:center;justify-content:center;width:46px;height:46px;border-radius:14px;background:linear-gradient(135deg,#ff9a56,#1e63ff);color:#fff;font-weight:800;font-size:18px;box-shadow:0 10px 20px rgba(30,99,255,.26)}" +
    ".trz-chat-brandtext{flex:1;min-width:0;display:flex;flex-direction:column;justify-content:center;align-self:stretch;padding-left:2px}" +
    ".trz-chat-brandtext strong{display:block;font-size:14px;line-height:1.15;color:#0f172a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:800}" +
    ".trz-chat-brandtext small{display:block;margin-top:3px;font-size:11px;line-height:1.2;color:#334155;font-weight:700}" +
    ".trz-chat-brandtext span{display:flex;align-items:center;gap:6px;font-size:11px;color:#0f172a;margin-top:7px;font-weight:700}" +
    ".trz-chat-brandtext.trz-chat-brandtext-minimal{display:flex;align-items:center;justify-content:flex-start}" +
    ".trz-chat-brandtext.trz-chat-brandtext-minimal span{margin-top:0}" +
    ".trz-chat-dot{width:8px;height:8px;border-radius:999px;background:#22c55e;display:inline-block}" +
    ".trz-chat-card{margin:0 0 10px;padding:13px;background:linear-gradient(180deg,rgba(9,19,42,.92),rgba(5,15,34,.94));border:1px solid rgba(96,165,250,.18);border-radius:18px;box-shadow:0 14px 30px rgba(2,8,23,.28)}" +
    ".trz-chat-welcome-card{background:linear-gradient(135deg,#62a6ff,#ffffff);border-color:rgb(199 180 180 / 74%);box-shadow:0 18px 40px rgba(5,15,34,.38)}" +
    ".trz-chat-help-card{background:linear-gradient(135deg,#62a6ff,#ffffff);border-color:rgb(199 180 180 / 74%);box-shadow:0 18px 40px rgba(5,15,34,.38)}" +
    ".trz-chat-card h3{margin:0 0 7px;font-size:15px;line-height:1.3;color:#0f172a}" +
    ".trz-chat-card p{margin:0 0 10px;font-size:12px;line-height:1.45;color:#334155}" +
    ".trz-chat-service-list{display:grid;gap:6px;margin:10px 0 0;padding:0;list-style:none}" +
    ".trz-chat-service-item{display:flex;align-items:center;gap:8px;width:100%;padding:6px 8px;border:none;border-radius:10px;background:rgba(255,255,255,.42);font-size:12px;color:#0f172a;text-align:left;cursor:pointer;transition:background .18s ease,transform .18s ease,box-shadow .18s ease}" +
    ".trz-chat-service-item:hover{background:rgba(255,255,255,.78);transform:translateX(2px);box-shadow:0 8px 18px rgba(11,47,114,.12)}" +
    ".trz-chat-service-list .service-icon{display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;color:#0b67ff;flex:0 0 auto}" +
    ".trz-chat-section-title{margin:0 0 10px;font-size:13px;font-weight:700;color:#f8fbff}" +
    ".trz-chat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:7px}" +
    ".trz-chat-tile{border:1px solid rgba(96,165,250,.28);background:linear-gradient(180deg,#ffffff 0%,#f2f8ff 100%);border-radius:14px;padding:9px 6px;text-align:center;color:#132349;font-size:10px;font-weight:700;line-height:1.2;min-height:72px;cursor:pointer;transition:transform .18s ease,box-shadow .18s ease,border-color .18s ease}" +
    ".trz-chat-tile:hover{transform:translateY(-2px);border-color:#60a5fa;box-shadow:0 14px 26px rgba(37,99,235,.18)}" +
    ".trz-chat-tile-icon{display:flex;align-items:center;justify-content:center;width:26px;height:26px;margin:0 auto 6px;border-radius:999px;background:#e9f2ff;color:#0b67ff}" +
    ".trz-chat-tile-icon svg{width:14px;height:14px;display:block}" +
    ".trz-chat-icon-image{width:100%;height:100%;object-fit:contain;display:block}" +
    ".trz-chat-actions{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-top:10px}" +
    ".trz-chat-cta{height:38px;border-radius:12px;border:none;font-size:12px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;padding:0 8px;text-align:center}" +
    ".trz-chat-cta svg{width:14px;height:14px;display:block}" +
    ".trz-chat-cta.primary{background:linear-gradient(135deg,#083da5,#0b67ff);color:#fff;box-shadow:0 16px 30px rgba(11,103,255,.28)}" +
    ".trz-chat-cta.secondary{background:linear-gradient(135deg,#f8d56c,#d4a017);color:#5b3b00;border:1px solid #e3bc52;box-shadow:0 10px 24px rgba(212,160,23,.28)}" +
    ".trz-chat-cta.ghost{background:linear-gradient(180deg,#ffffff,#edf5ff);color:#163278;border:1px solid rgba(96,165,250,.28);box-shadow:0 10px 24px rgba(15,23,42,.12)}" +
    ".trz-chat-thread{padding:11px 11px 8px;max-height:390px;overflow:auto;background:linear-gradient(180deg,rgba(5,15,34,.12),rgba(5,15,34,0))}" +
    ".trz-chat-message{display:flex;gap:7px;margin-bottom:9px;align-items:flex-end}" +
    ".trz-chat-message.user{justify-content:flex-end}" +
    ".trz-chat-avatar{width:30px;height:30px;border-radius:999px;background:linear-gradient(135deg,#ffffff,#f1f5f9);display:flex;align-items:center;justify-content:center;color:#0b67ff;font-size:11px;font-weight:800;flex:0 0 auto;overflow:hidden;border:1px solid rgba(191,219,254,.65);box-shadow:0 8px 18px rgba(2,8,23,.22)}" +
    ".trz-chat-avatar img{width:78%;height:78%;object-fit:contain;display:block}" +
    ".trz-chat-bubble{max-width:286px;padding:10px 12px;border-radius:16px;background:#ffffff;border:1px solid rgba(191,219,254,.74);color:#0f172a;box-shadow:0 10px 22px rgba(2,8,23,.14);font-size:12px;line-height:1.42}" +
    ".trz-chat-message.user .trz-chat-bubble{background:linear-gradient(135deg,#0a2f79,#0b67ff);color:#fff;border:1px solid rgba(96,165,250,.4);border-bottom-right-radius:7px}" +
    ".trz-chat-message.bot .trz-chat-bubble{border-bottom-left-radius:7px;background:linear-gradient(135deg,#8fc2ff 0%,#ffffff 72%)}" +
    ".trz-chat-message.bot.success .trz-chat-bubble{background:linear-gradient(135deg,#15803d,#16a34a);color:#fff;border:none;box-shadow:0 10px 24px rgba(22,163,74,.24)}" +
    ".trz-chat-summary-table{display:grid;gap:6px;margin-top:10px;padding:8px;border:1px solid rgba(255,255,255,.16);border-radius:12px;background:linear-gradient(135deg,rgba(150,196,255,.18),rgba(255,255,255,.08))}" +
    ".trz-chat-summary-row{display:grid;grid-template-columns:92px minmax(0,1fr);gap:8px;align-items:center;padding:7px 8px;border:1px solid rgba(255,255,255,.12);border-radius:10px;background:linear-gradient(135deg,rgba(137,189,255,.16),rgba(255,255,255,.05))}" +
    ".trz-chat-summary-label{font-size:10px;font-weight:700;color:rgba(255,255,255,.78);line-height:1.25}" +
    ".trz-chat-summary-value{font-size:12px;line-height:1.35;color:#fff;word-break:break-word}" +
    ".trz-chat-bubble.form-card{max-width:252px;padding:10px;background:linear-gradient(135deg,#76b3ff 0%,#ffffff 78%)}" +
    ".trz-chat-inline-form{display:grid;gap:8px;margin-top:7px}" +
    ".trz-chat-inline-form label{display:grid;gap:4px;font-size:10px;font-weight:700;color:#334155}" +
    ".trz-chat-inline-form input,.trz-chat-inline-form textarea,.trz-chat-inline-form select{width:100%;border:1px solid #d7e3fb;border-radius:10px;padding:8px 10px;font:inherit;color:#0f172a;background:linear-gradient(135deg,#eef6ff,#ffffff);outline:none;resize:none}" +
    ".trz-chat-inline-form input[readonly]{background:#eef4ff;color:#1e3a8a;font-weight:700;cursor:not-allowed}" +
    ".trz-chat-inline-form input:focus,.trz-chat-inline-form textarea:focus,.trz-chat-inline-form select:focus{border-color:#60a5fa;box-shadow:0 0 0 3px rgba(96,165,250,.18)}" +
    ".trz-chat-inline-form button{height:34px;border:none;border-radius:10px;background:linear-gradient(135deg,#14378f,#1e63ff);color:#fff;font-size:11px;font-weight:700;cursor:pointer}" +
    ".trz-chat-confirm{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px}" +
    ".trz-chat-confirm button{height:34px;border:none;border-radius:10px;font-size:11px;font-weight:700;cursor:pointer}" +
    ".trz-chat-confirm .submit{background:linear-gradient(135deg,#15803d,#16a34a);color:#fff}" +
    ".trz-chat-confirm .edit{background:#eef4ff;color:#163278;border:1px solid #cfe0ff}" +
    ".trz-chat-time{display:block;margin-top:5px;font-size:9px;opacity:.62}" +
    ".trz-chat-inputbar{display:flex;align-items:center;gap:0;padding:10px 11px 11px;background:rgba(4,13,30,.96);border-top:1px solid rgba(96,165,250,.18)}" +
    ".trz-chat-inputbar.is-hidden{display:none}" +
    ".trz-chat-send svg{width:14px;height:14px;display:block}" +
    ".trz-chat-inputwrap{flex:1;display:flex;align-items:center;gap:5px;border:1px solid rgba(148,163,184,.28);background:rgba(7,18,39,.86);border-radius:16px;padding:0 5px 0 10px;box-shadow:inset 0 1px 0 rgba(255,255,255,.03)}" +
    ".trz-chat-input{flex:1;height:40px;border:none;background:transparent;font-size:12px;outline:none;color:#f8fafc}" +
    ".trz-chat-input::placeholder{color:rgba(226,232,240,.58)}" +
    ".trz-chat-send{width:34px;height:34px;border:none;border-radius:999px;background:linear-gradient(135deg,#0b67ff,#2aa7ff);color:#fff;font-size:14px;cursor:pointer;box-shadow:0 10px 22px rgba(11,103,255,.35);display:flex;align-items:center;justify-content:center;flex:0 0 auto}" +
    ".trz-chat-controls{display:flex;align-items:center;justify-content:flex-end;gap:6px;position:relative;width:100%;flex:0 0 auto}" +
    ".trz-chat-widget.trz-panel-open .trz-chat-controls{visibility:hidden;pointer-events:none}" +
    ".trz-chat-drag{display:none;width:18px;height:18px;border:none;border-radius:999px;background:linear-gradient(135deg,#22c55e,#16a34a);color:#ffffff;box-shadow:0 8px 18px rgba(34,197,94,.26);cursor:grab;align-items:center;justify-content:center;touch-action:none;opacity:0;pointer-events:none;transform:translateX(6px);transition:opacity .18s ease,transform .18s ease}" +
    ".trz-chat-drag:active{cursor:grabbing}" +
    ".trz-chat-drag svg{width:8px;height:8px;display:block}" +
    ".trz-chat-controls:hover .trz-chat-drag,.trz-chat-drag:focus-visible{opacity:1;pointer-events:auto;transform:translateX(0)}" +
    ".trz-chat-toggle{width:60px;height:60px;border:none;border-radius:999px;background:radial-gradient(circle at top,#1e7fff 0%,#0c4fd9 55%,#ff6b2c 100%);color:#fff;box-shadow:0 18px 36px rgba(9,37,94,.45);cursor:pointer;display:flex;align-items:center;justify-content:center;margin-left:auto}" +
    ".trz-chat-toggle svg{width:26px;height:26px;display:block}" +
    ".trz-chat-hidden{display:none}" +
    "@media (max-width:520px){.trz-chat-widget{right:16px;bottom:16px;width:min(372px,calc(100vw - 32px),calc(100dvw - 32px));max-width:calc(100vw - 32px);max-width:calc(100dvw - 32px)}.trz-chat-panel{width:100%;max-width:none}.trz-chat-logo{width:118px;height:42px;padding:6px 8px 6px 4px}.trz-chat-brand{grid-template-columns:118px minmax(0,1fr) 30px;gap:8px}.trz-chat-menu{width:30px;height:30px}.trz-chat-brandtext strong{font-size:13px}.trz-chat-brandtext small{font-size:10px}.trz-chat-grid{grid-template-columns:repeat(2,1fr)}.trz-chat-widget.trz-panel-open{left:0!important;top:0!important;right:0!important;bottom:0!important;width:100vw;max-width:100vw;max-width:100dvw}.trz-chat-widget.trz-panel-open .trz-chat-panel{position:fixed;inset:0;width:100vw;max-width:100vw;max-width:100dvw;height:100vh;height:100dvh;border-radius:0;display:flex;flex-direction:column;border:none}.trz-chat-widget.trz-panel-open .trz-chat-thread{flex:1;max-height:none;padding-bottom:12px}.trz-chat-widget.trz-panel-open .trz-chat-inputbar{margin-top:auto}.no-ios-zoom{font-size:16px!important}}";
  document.head.appendChild(style);

  var widget = document.createElement("div");
  widget.className = "trz-chat-widget";
  widget.innerHTML =
    '<div class="trz-chat-panel" id="trzChatPanel">' +
    '<div class="trz-chat-topbar">' +
    '<div class="trz-chat-brand">' +
    '<div class="trz-chat-logo">' + renderBrandLogo() + "</div>" +
    renderBrandText() +
    '<button class="trz-chat-menu" type="button">&#8942;</button>' +
    "</div>" +
    "</div>" +
    '<div class="trz-chat-thread" id="trzChatBody">' +
    '<div class="trz-chat-card trz-chat-welcome-card">' +
    '<h3>' + introTitle + '</h3>' +
    '<p>' + introText + '</p>' +
    '<ul class="trz-chat-service-list">' +
    '<li><button class="trz-chat-service-item" type="button" data-flow="common" data-message="I need help with Web Development." data-prefill-service="Web Development"><span class="service-icon">' + getIconMarkup("globe") + "</span><span>Web Development</span></button></li>" +
    '<li><button class="trz-chat-service-item" type="button" data-flow="common" data-message="I need help with Mobile App Development." data-prefill-service="Mobile App Development"><span class="service-icon">' + getIconMarkup("phone") + '</span><span>Mobile Apps</span></button></li>' +
    '<li><button class="trz-chat-service-item" type="button" data-flow="common" data-message="I need help with AI/ML Tech Solutions." data-prefill-service="AI/ML Tech Solutions"><span class="service-icon">' + getIconMarkup("ai") + "</span><span>AI/ML Tech Solutions</span></button></li>" +
    '<li><button class="trz-chat-service-item" type="button" data-flow="common" data-message="I need help with Blockchain Development." data-prefill-service="Blockchain Development"><span class="service-icon">' + getIconMarkup("chain") + '</span><span>Blockchain</span></button></li>' +
    '<li><button class="trz-chat-service-item" type="button" data-flow="common" data-message="I need help with UI/UX Design Services." data-prefill-service="UI/UX Design Services"><span class="service-icon">' + getIconMarkup("ux") + "</span><span>UI/UX Design Services</span></button></li>" +
    '<li><button class="trz-chat-service-item" type="button" data-flow="common" data-message="I need help with Cloud & DevOps Services." data-prefill-service="Cloud & DevOps Services"><span class="service-icon">' + getIconMarkup("cloud") + "</span><span>Cloud & DevOps Services</span></button></li>" +
    "</ul>" +
    "</div>" +
    '<div class="trz-chat-card trz-chat-help-card">' +
    '<div class="trz-chat-section-title">How can we help you today?</div>' +
    '<div class="trz-chat-grid" id="trzChatGrid"></div>' +
    '<div class="trz-chat-actions">' +
    '<button class="trz-chat-cta primary" type="button" data-flow="common" data-message="I want to start a project." data-prefill-service="Start Project">' + getIconMarkup("rocket") + '<span>Start Project</span></button>' +
    '<button class="trz-chat-cta secondary" type="button" data-flow="common" data-message="Please share a cost estimate." data-prefill-service="Get Quote">' + getIconMarkup("wallet") + '<span>Get Quote</span></button>' +
    '<button class="trz-chat-cta ghost" type="button" data-flow="student" data-message="I am interested in student guidance.">' + getIconMarkup("student") + '<span>Student</span></button>' +
    '<button class="trz-chat-cta ghost" type="button" data-flow="career" data-message="I want to explore career opportunities.">' + getIconMarkup("career") + '<span>Career</span></button>' +
    "</div>" +
    "</div>" +
    renderBotMessage("Hi! Tell us what you are planning and we will guide you.") +
    "</div>" +
    '<form class="trz-chat-inputbar" id="trzChatForm">' +
    '<div class="trz-chat-inputwrap">' +
    '<input class="trz-chat-input no-ios-zoom" id="trzChatInput" type="text" placeholder="Type your message..." autocomplete="off" />' +
    '<button class="trz-chat-send" type="submit" aria-label="Send">' + getIconMarkup("send") + "</button>" +
    "</div>" +
    "</form>" +
    "</div>" +
    '<div class="trz-chat-controls">' +
    '<button class="trz-chat-drag" id="trzChatDrag" type="button" aria-label="Drag chat">' +
    getIconMarkup("drag") +
    "</button>" +
    '<button class="trz-chat-toggle" id="trzChatToggle" type="button" aria-label="Open chat">' +
    '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4c-4.97 0-9 3.58-9 8 0 2.3 1.1 4.38 2.88 5.84L5 21l3.44-1.9c1.1.3 2.3.46 3.56.46 4.97 0 9-3.58 9-8s-4.03-8-9-8Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M8.5 11.5h7M8.5 8.5h4.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>' +
    "</button>" +
    "</div>";

  document.body.appendChild(widget);

  var panel = widget.querySelector("#trzChatPanel");
  var dragHandle = widget.querySelector("#trzChatDrag");
  var toggle = widget.querySelector("#trzChatToggle");
  var menuButton = widget.querySelector(".trz-chat-menu");
  var form = widget.querySelector("#trzChatForm");
  var input = widget.querySelector("#trzChatInput");
  var body = widget.querySelector("#trzChatBody");
  var grid = widget.querySelector("#trzChatGrid");
  var dragState = null;
  var hasDragged = false;
  var leadFlow = null;

  applyDefaultAnchoredPosition();
  updatePanelPlacement();

  for (var i = 0; i < services.length; i++) {
    var tile = document.createElement("button");
    tile.type = "button";
    tile.className = "trz-chat-tile";
    tile.setAttribute("data-flow", "common");
    tile.setAttribute("data-message", "I need help with " + services[i].label + ".");
    tile.setAttribute("data-prefill-service", services[i].label);
    tile.innerHTML = '<span class="trz-chat-tile-icon">' + getIconMarkup(services[i].icon) + "</span>" + services[i].label;
    grid.appendChild(tile);
  }

  function getIconMarkup(name) {
    var imagePath = getIconImagePath(name);

    if (imagePath) {
      return '<img class="trz-chat-icon-image" src="' + escapeHtml(imagePath) + '" alt="" />';
    }

    var icons = {
      globe: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="#0b67ff"/><path d="M3.5 12h17M12 3a13.5 13.5 0 0 1 0 18M12 3a13.5 13.5 0 0 0 0 18M6.2 6.8c1.7 1 3.7 1.5 5.8 1.5s4.1-.5 5.8-1.5M6.2 17.2c1.7-1 3.7-1.5 5.8-1.5s4.1.5 5.8 1.5" fill="none" stroke="#071c45" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6.5" y="2.8" width="11" height="18.4" rx="2.6" fill="#0b67ff"/><rect x="8.4" y="5.4" width="7.2" height="10.4" rx="1.1" fill="#ffffff"/><circle cx="12" cy="18.1" r="1.1" fill="#dbeafe"/></svg>',
      ai: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="7" width="14" height="11" rx="3" fill="#dbeafe" stroke="#0b67ff" stroke-width="1.5"/><circle cx="9" cy="12.5" r="1.2" fill="#0b67ff"/><circle cx="15" cy="12.5" r="1.2" fill="#0b67ff"/><path d="M9.5 15h5" stroke="#0b67ff" stroke-width="1.5" stroke-linecap="round"/><path d="M9 7V5.3M15 7V5.3" stroke="#7c3aed" stroke-width="1.6" stroke-linecap="round"/><circle cx="9" cy="4.2" r="1" fill="#ec4899"/><circle cx="15" cy="4.2" r="1" fill="#8b5cf6"/></svg>',
      chain: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.2 14.8 6.7 17.3a3.2 3.2 0 0 1-4.5-4.5l2.8-2.8a3.2 3.2 0 0 1 4.5 0" fill="none" stroke="#7c8aa0" stroke-width="2.1" stroke-linecap="round"/><path d="m14.8 9.2 2.5-2.5a3.2 3.2 0 0 1 4.5 4.5l-2.8 2.8a3.2 3.2 0 0 1-4.5 0" fill="none" stroke="#7c8aa0" stroke-width="2.1" stroke-linecap="round"/><path d="m8.8 15.2 6.4-6.4" fill="none" stroke="#9aa7b8" stroke-width="2.1" stroke-linecap="round"/></svg>',
      ux: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.2 6.2A2.2 2.2 0 0 1 7.4 4h9.2a2.2 2.2 0 0 1 2.2 2.2v6.5a2.2 2.2 0 0 1-2.2 2.2h-3.5L9.8 18v-3.1H7.4a2.2 2.2 0 0 1-2.2-2.2V6.2Z" fill="#e6f0ff" stroke="#0b67ff" stroke-width="1.4"/><path d="m8.2 8.4 2 2.7 2-2.7M14 8.3v3.7M16.2 8.3v3.7" fill="none" stroke="#0b67ff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      cloud: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.8 18.5c-2.4 0-4.3-1.6-4.3-3.8 0-2.1 1.7-3.7 3.9-3.8.7-2.2 2.8-3.8 5.3-3.8 2.8 0 5.1 2 5.6 4.7 1.5.2 2.7 1.5 2.7 3.1 0 1.8-1.5 3.6-3.7 3.6H7.8Z" fill="#4ea1ff"/></svg>',
      rocket: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.2 3.5c2.8.9 5 3.1 5.9 5.9-2 1.7-4.3 3-6.8 3.8l-2.4 2.4-2.9-2.9 2.4-2.4c.8-2.5 2.1-4.8 3.8-6.8Z" fill="#ff5b3d"/><path d="M10.9 15.6 8 18.5l-3 .5.5-3 2.9-2.9" fill="#8b5cf6"/><circle cx="15.2" cy="8.8" r="1.2" fill="#ffffff"/><path d="M6 18.5c.3-1.2 1.2-2.1 2.4-2.4" fill="none" stroke="#fbbf24" stroke-width="1.6" stroke-linecap="round"/></svg>',
      wallet: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4.5c-1.7 0-3 .6-3 1.4V7c-1.5.3-2.6 1.4-2.6 2.8 0 4 2.8 8.2 5.6 11.3 2.8-3.1 5.6-7.3 5.6-11.3 0-1.4-1.1-2.5-2.6-2.8V5.9c0-.8-1.3-1.4-3-1.4Z" fill="#ffd34d"/><path d="M12 9.4v5.1M10.2 11.2h2.4c.8 0 1.4.5 1.4 1.1s-.6 1.1-1.4 1.1h-1.2c-.8 0-1.4.5-1.4 1.1s.6 1.1 1.4 1.1h2.4" fill="none" stroke="#6b4f00" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      student: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 8 9-4 9 4-9 4-9-4Z" fill="#dbeafe" stroke="#1d4ed8" stroke-width="1.4" stroke-linejoin="round"/><path d="M7 10.5v3.8c0 .6.3 1.1.9 1.4l4.1 2 4.1-2c.6-.3.9-.8.9-1.4v-3.8" fill="none" stroke="#1d4ed8" stroke-width="1.5" stroke-linejoin="round"/><circle cx="18.5" cy="9.2" r="1.1" fill="#f59e0b"/></svg>',
      career: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.8 6.8V5.7A1.7 1.7 0 0 1 10.5 4h3A1.7 1.7 0 0 1 15.2 5.7v1.1" fill="none" stroke="#475569" stroke-width="1.5" stroke-linecap="round"/><rect x="3.5" y="7" width="17" height="12" rx="2.2" fill="#eef2ff" stroke="#475569" stroke-width="1.4"/><path d="M3.5 12h17" stroke="#475569" stroke-width="1.4"/><path d="M10.2 12.8h3.6" stroke="#1e3a8a" stroke-width="1.6" stroke-linecap="round"/></svg>',
      smile: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.7"/><path d="M9 14c.8 1 1.8 1.5 3 1.5s2.2-.5 3-1.5M9 10.5h.01M15 10.5h.01" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
      paperclip: '<svg viewBox="0 0 24 24" fill="none"><path d="m10 13.5 5.5-5.5a3 3 0 1 1 4.24 4.24l-7.43 7.43a5 5 0 1 1-7.07-7.07l7.08-7.08" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      send: '<svg viewBox="0 0 24 24" fill="none"><path d="M4 11.5 20 4l-4.8 16-3.3-5.2L4 11.5Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M20 4 11.9 14.8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
      drag: '<svg viewBox="0 0 24 24" fill="none"><path d="M9 5.5h.01M9 12h.01M9 18.5h.01M15 5.5h.01M15 12h.01M15 18.5h.01" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    };

    return icons[name] || icons.globe;
  }

  function getIconImagePath(name) {
    var builtInImageMap = {
      globe: "public/html/web/images/chat-icon/web.png",
      phone: "public/html/web/images/chat-icon/mobile.png",
      ai: "public/html/web/images/chat-icon/robot.png",
      chain: "public/html/web/images/chat-icon/link.png",
      ux: "public/html/web/images/chat-icon/roket.png",
      cloud: "public/html/web/images/chat-icon/cloud.png"
    };

    if (iconImageMap[name]) {
      return iconImageMap[name];
    }

    if (/\.(png|jpg|jpeg|webp|gif|svg)$/i.test(String(name || ""))) {
      return resolveAssetUrl(name);
    }

    return builtInImageMap[name] ? resolveAssetUrl(builtInImageMap[name]) : "";
  }

  function getAssetBaseUrl() {
    var currentScript = document.currentScript;
    var scriptSrc = currentScript && currentScript.src ? currentScript.src : "";
    var publicIndex;

    if (!scriptSrc) {
      return window.location.origin + "/";
    }

    publicIndex = scriptSrc.indexOf("public/index.html");
    if (publicIndex !== -1) {
      return scriptSrc.slice(0, publicIndex + 1);
    }

    return scriptSrc.slice(0, scriptSrc.lastIndexOf("/") + 1);
  }

  function resolveAssetUrl(path) {
    if (!path) {
      return "";
    }

    if (/^(https?:)?\/\//i.test(path) || path.indexOf("data:") === 0) {
      return path;
    }

    if (path.charAt(0) === "/") {
      return window.location.origin + path;
    }

    return assetBaseUrl + path.replace(/^\.?\//, "");
  }

  function renderBrandLogo() {
    if (logoUrl) {
      return '<img src="' + escapeHtml(logoUrl) + '" alt="Technorizen logo" />';
    }

    return '<span class="trz-chat-logo-fallback">T</span>';
  }

  function renderBrandText() {
    if (!title && !subtitle && !statusText) {
      return '<div class="trz-chat-brandtext trz-chat-brandtext-minimal"></div>';
    }

    if (!title && !subtitle) {
      return '<div class="trz-chat-brandtext trz-chat-brandtext-minimal">' +
        (statusText ? '<span><i class="trz-chat-dot"></i>' + escapeHtml(statusText) + "</span>" : "") +
        "</div>";
    }

    return '<div class="trz-chat-brandtext"><strong>' + escapeHtml(title) + '</strong>' +
      (subtitle ? '<small>' + escapeHtml(subtitle) + '</small>' : "") +
      (statusText ? '<span><i class="trz-chat-dot"></i>' + escapeHtml(statusText) + "</span>" : "") +
      "</div>";
  }

  function renderAvatarMarkup() {
    if (logoUrl) {
      return '<img src="' + escapeHtml(logoUrl) + '" alt="Technorizen" />';
    }

    return "T";
  }

  function renderBotMessage(text) {
    return (
      '<div class="trz-chat-message bot">' +
      '<div class="trz-chat-avatar">' + renderAvatarMarkup() + "</div>" +
      '<div class="trz-chat-bubble">' +
      escapeHtml(text) +
      "</div>" +
      "</div>"
    );
  }

  function renderSuccessMessage(text) {
    return (
      '<div class="trz-chat-message bot success">' +
      '<div class="trz-chat-avatar">' + renderAvatarMarkup() + "</div>" +
      '<div class="trz-chat-bubble">' +
      escapeHtml(text) +
      "</div>" +
      "</div>"
    );
  }

  function renderUserMessage(text) {
    return (
      '<div class="trz-chat-message user">' +
      '<div class="trz-chat-bubble">' +
      escapeHtml(text) +
      "</div>" +
      "</div>"
    );
  }

  function renderSummaryMessage(flowType, answers) {
    var titleText = "";
    var lines = [];

    if (flowType === "student") {
      titleText = "Student Details";
      lines = [String(answers[0] || ""), String(answers[1] || ""), String(answers[2] || "")];
    } else if (flowType === "career") {
      titleText = "Career Details";
      lines = [String(answers[0] || ""), String(answers[1] || ""), String(answers[2] || "")];
    }

    return (
      '<div class="trz-chat-message user">' +
      '<div class="trz-chat-bubble">' +
      "<strong>" + escapeHtml(titleText) + "</strong>" +
      '<div class="trz-chat-summary-table">' +
      lines.map(function (line) { return formatSummaryLine(line); }).join("") +
      "</div>" +
      "</div>" +
      "</div>"
    );
  }

  function renderStructuredFormMessage(flowType, step, question) {
    var fields = structuredFlowFields[flowType] && structuredFlowFields[flowType][step];
    var html = "";
    var i;
    var savedValues = leadFlow && leadFlow.stepValues && leadFlow.stepValues[step] ? leadFlow.stepValues[step] : {};

    if (!fields) {
      return renderBotMessage(question);
    }

    for (i = 0; i < fields.length; i += 1) {
      html +=
        '<label>' +
        escapeHtml(fields[i].label) +
        (fields[i].type === "textarea"
          ? '<textarea class="no-ios-zoom" rows="3" name="' + escapeHtml(fields[i].name) + '" placeholder="' + escapeHtml(fields[i].placeholder) + '" required>' + escapeHtml(savedValues[fields[i].name] || "") + "</textarea>"
          : fields[i].type === "select"
            ? renderSelectField(fields[i], savedValues[fields[i].name] || "")
            : renderInputField(fields[i], savedValues[fields[i].name] || "")) +
        "</label>";
    }

    return (
      '<div class="trz-chat-message bot">' +
      '<div class="trz-chat-avatar">' + renderAvatarMarkup() + "</div>" +
      '<div class="trz-chat-bubble form-card">' +
      "<strong>" +
      escapeHtml(question) +
      "</strong>" +
      '<form class="trz-chat-inline-form" data-structured-flow="' + escapeHtml(flowType) + '" data-step="' + step + '">' +
      html +
      '<button type="submit">Continue</button>' +
      "</form>" +
      "</div>" +
      "</div>"
    );
  }

  function formatStructuredAnswer(flowType, step, values) {
    if (flowType === "common") {
      if (step === 0) {
        return "Service: " + values.service_interest;
      }
      if (step === 1) {
        return "First Name: " + values.first_name + "\nLast Name: " + values.last_name + "\nCountry Code: " + values.country_code + "\nMobile Number: " + values.mobile_number;
      }
      if (step === 2) {
        return "Email Address: " + values.email + "\nCompany Name: " + values.company_name;
      }
      if (step === 3) {
        return "Project Type: " + values.project_type + "\nEstimated Budget: " + values.budget;
      }
      if (step === 4) {
        return "Project Brief: " + values.project_brief;
      }
    }

    if (flowType === "student") {
      if (step === 0) {
        return "First Name: " + values.first_name + "\nLast Name: " + values.last_name + "\nCountry Code: " + values.country_code + "\nMobile Number: " + values.mobile_number + "\nEmail Address: " + values.email;
      }
      if (step === 1) {
        return "Educational Detail: " + values.education;
      }
      if (step === 2) {
        return "Interested Course: " + values.course;
      }
    }

    if (flowType === "career") {
      if (step === 0) {
        return "First Name: " + values.first_name + "\nLast Name: " + values.last_name + "\nCountry Code: " + values.country_code + "\nMobile Number: " + values.mobile_number + "\nEmail Address: " + values.email;
      }
      if (step === 1) {
        return "Applying For: " + values.job_role;
      }
      if (step === 2) {
        return "Experience: " + values.experience + "\nCurrent CTC: " + values.current_ctc + "\nExpected CTC: " + values.expected_ctc + "\nSkills: " + values.skills + "\nCurrent Location: " + values.location + "\nResume: " + (values.resume && values.resume.name ? values.resume.name : "");
      }
    }

    return "";
  }

  function renderSelectField(field, savedValue) {
    var options = field.options || [];
    var html = '<select class="no-ios-zoom" name="' + escapeHtml(field.name) + '" required><option value="">' + escapeHtml(field.selectPlaceholder || "Select an option") + "</option>";
    var i;
    var selectedValue = savedValue || field.value || "";
    var optionValue;
    var optionLabel;

    if (!selectedValue && field.name === "service_interest" && leadFlow && leadFlow.prefillService) {
      selectedValue = leadFlow.prefillService;
    }

    for (i = 0; i < options.length; i += 1) {
      if (typeof options[i] === "string") {
        optionValue = options[i];
        optionLabel = options[i];
      } else {
        optionValue = options[i].value;
        optionLabel = options[i].label;
      }

      html += '<option value="' + escapeHtml(optionValue) + '"' + (selectedValue === optionValue ? " selected" : "") + ">" + escapeHtml(optionLabel) + "</option>";
    }

    html += "</select>";
    return html;
  }

  function renderInputField(field, savedValue) {
    if (field.type === "file") {
      return '<input class="no-ios-zoom" type="file" name="' + escapeHtml(field.name) + '" accept="' + escapeHtml(field.accept || "") + '" required />';
    }

    var attributes = [
      'type="' + escapeHtml(field.type) + '"',
      'name="' + escapeHtml(field.name) + '"',
      'placeholder="' + escapeHtml(field.placeholder || "") + '"',
      'value="' + escapeHtml(savedValue || field.value || "") + '"',
      'class="no-ios-zoom"'
    ];

    if (field.inputmode) {
      attributes.push('inputmode="' + escapeHtml(field.inputmode) + '"');
    }

    if (field.pattern) {
      attributes.push('pattern="' + escapeHtml(field.pattern) + '"');
    }

    if (field.maxlength) {
      attributes.push('maxlength="' + escapeHtml(field.maxlength) + '"');
    }

    if (field.accept) {
      attributes.push('accept="' + escapeHtml(field.accept) + '"');
    }

    if (field.readonly) {
      attributes.push("readonly");
    }

    if (field.digitsOnly) {
      attributes.push('data-digits-only="true"');
    }

    attributes.push("required");

    return "<input " + attributes.join(" ") + " />";
  }

  function formatSummaryLine(line) {
    return String(line)
      .split("\n")
      .map(function (part) {
        var separatorIndex = String(part).indexOf(": ");
        var label;
        var value;

        if (separatorIndex === -1) {
          return escapeHtml(part);
        }

        label = String(part).slice(0, separatorIndex);
        value = String(part).slice(separatorIndex + 2);

        return '<div class="trz-chat-summary-row"><div class="trz-chat-summary-label">' +
          escapeHtml(label) +
          '</div><div class="trz-chat-summary-value">' +
          escapeHtml(value) +
          "</div></div>";
      })
      .join("");
  }

  function renderSummaryBlock(titleText, lines) {
    var formattedLines = lines.map(function (line) {
      return formatSummaryLine(line);
    });

    return (
      '<div class="trz-chat-message user">' +
      '<div class="trz-chat-bubble">' +
      "<strong>" + escapeHtml(titleText) + "</strong>" +
      '<div class="trz-chat-summary-table">' +
      formattedLines.join("") +
      "</div>" +
      "</div>" +
      "</div>"
    );
  }

  function renderConfirmationMessage() {
    return (
      '<div class="trz-chat-message bot">' +
      '<div class="trz-chat-avatar">' + renderAvatarMarkup() + "</div>" +
      '<div class="trz-chat-bubble">' +
      "Please review your details. Do you want to submit or edit again?" +
      '<div class="trz-chat-confirm">' +
      '<button class="submit" type="button" data-confirm-action="submit">Submit</button>' +
      '<button class="edit" type="button" data-confirm-action="edit">Edit Again</button>' +
      "</div>" +
      "</div>" +
      "</div>"
    );
  }

  function buildSubmissionFormData() {
    var formData = new FormData();
    var stepValues;

    if (!leadFlow) {
      return formData;
    }

    stepValues = leadFlow.stepValues || [];
    formData.append("flow_type", leadFlow.flowType === "common" ? "project" : leadFlow.flowType);

    if (leadFlow.flowType === "common") {
      formData.append("service_interest", stepValues[0]?.service_interest || leadFlow.prefillService || "");
      formData.append("first_name", stepValues[1]?.first_name || "");
      formData.append("last_name", stepValues[1]?.last_name || "");
      formData.append("country_code", stepValues[1]?.country_code || "");
      formData.append("mobile_number", stepValues[1]?.mobile_number || "");
      formData.append("email", stepValues[2]?.email || "");
      formData.append("company_name", stepValues[2]?.company_name || "");
      formData.append("project_type", stepValues[3]?.project_type || "");
      formData.append("budget", stepValues[3]?.budget || "");
      formData.append("project_brief", stepValues[4]?.project_brief || "");
      return formData;
    }

    if (leadFlow.flowType === "student") {
      formData.append("first_name", stepValues[0]?.first_name || "");
      formData.append("last_name", stepValues[0]?.last_name || "");
      formData.append("country_code", stepValues[0]?.country_code || "");
      formData.append("mobile_number", stepValues[0]?.mobile_number || "");
      formData.append("email", stepValues[0]?.email || "");
      formData.append("educational_detail", stepValues[1]?.education || "");
      formData.append("interested_course", stepValues[2]?.course || "");
      return formData;
    }

    if (leadFlow.flowType === "career") {
      formData.append("first_name", stepValues[0]?.first_name || "");
      formData.append("last_name", stepValues[0]?.last_name || "");
      formData.append("country_code", stepValues[0]?.country_code || "");
      formData.append("mobile_number", stepValues[0]?.mobile_number || "");
      formData.append("email", stepValues[0]?.email || "");
      formData.append("job_role", stepValues[1]?.job_role || "");
      formData.append("experience", stepValues[2]?.experience || "");
      formData.append("current_ctc", stepValues[2]?.current_ctc || "");
      formData.append("expected_ctc", stepValues[2]?.expected_ctc || "");
      formData.append("skills", stepValues[2]?.skills || "");
      formData.append("current_location", stepValues[2]?.location || "");

      if (stepValues[2]?.resume && stepValues[2].resume.file) {
        formData.append("resume", stepValues[2].resume.file);
      }
    }

    return formData;
  }

  function setInputbarVisibility(isVisible) {
    form.classList.toggle("is-hidden", !isVisible);
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function appendMessage(html) {
    body.insertAdjacentHTML("beforeend", html);
    body.scrollTop = body.scrollHeight;
  }

  function getFlowQuestions(flowType) {
    if (flowType === "common") {
      return [
        "Please select the service you are interested in.",
        "Please share your contact details.",
        "Please share your email and company name.",
        "Please select your project type and budget.",
        "Please describe your project briefly."
      ];
    }

    if (flowType === "student") {
      return studentQuestions;
    }

    if (flowType === "career") {
      return careerQuestions;
    }

    return leadQuestions;
  }

  function getCompletionMessage(flowType) {
    if (flowType === "common") {
      return "Thank you for sharing your project details. Our representative will contact you soon.";
    }

    if (flowType === "student") {
      return "Thank you for sharing your details. Our representative will contact you soon.";
    }

    if (flowType === "career") {
      return "Thank you for sharing your career details. Our representative will contact you soon.";
    }

    return "Thank you for sharing your details. Our representative will contact you soon.";
  }

  function startLeadFlow(selection, flowType) {
    var questions = getFlowQuestions(flowType);
    var isStructured = flowType === "student" || flowType === "career" || flowType === "common";

    leadFlow = {
      selection: selection,
      flowType: flowType || "project",
      step: 0,
      answers: [],
      questions: questions,
      structured: isStructured,
      prefillService: selection,
      stepValues: [],
      awaitingConfirmation: false
    };

    appendMessage(renderUserMessage(selection));
    window.setTimeout(function () {
      if (isStructured) {
        appendMessage(renderStructuredFormMessage(leadFlow.flowType, 0, questions[0]));
        setInputbarVisibility(false);
      } else {
        appendMessage(renderBotMessage(questions[0]));
      }
    }, 250);
  }

  function advanceLeadFlow(answer) {
    if (!leadFlow) {
      return false;
    }

    leadFlow.answers.push(answer);
    if (!leadFlow.structured) {
      appendMessage(renderUserMessage(answer));
    }
    input.value = "";
    leadFlow.step += 1;

    if (leadFlow.step < leadFlow.questions.length) {
      window.setTimeout(function () {
        if (leadFlow.structured) {
          appendMessage(renderStructuredFormMessage(leadFlow.flowType, leadFlow.step, leadFlow.questions[leadFlow.step]));
        } else {
          appendMessage(renderBotMessage(leadFlow.questions[leadFlow.step]));
        }
      }, 250);
      return true;
    }

    if (leadFlow.flowType === "common") {
      appendMessage(
        renderSummaryBlock("Project Details", [
          leadFlow.answers[0] || "",
          leadFlow.answers[1] || "",
          leadFlow.answers[2] || "",
          leadFlow.answers[3] || "",
          leadFlow.answers[4] || ""
        ])
      );
    } else if (leadFlow.structured) {
      appendMessage(renderSummaryMessage(leadFlow.flowType, leadFlow.answers));
    }

    leadFlow.awaitingConfirmation = true;
    window.setTimeout(function () {
      appendMessage(renderConfirmationMessage());
    }, 250);
    return true;
  }

  function finalizeLeadFlowSubmission() {
    var completedFlowType;
    var formData;

    if (!leadFlow) {
      return;
    }

    if (!chatSubmitUrl) {
      appendMessage(renderBotMessage("Submission URL missing. Please contact support."));
      return;
    }

    completedFlowType = leadFlow.flowType;
    formData = buildSubmissionFormData();

    fetch(chatSubmitUrl, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json"
      }
    })
      .then(function (response) {
        if (!response.ok) {
          return response.json().then(function (data) {
            throw new Error(data.message || "Unable to save chat details.");
          });
        }

        return response.json();
      })
      .then(function () {
        setInputbarVisibility(true);
        leadFlow = null;
        appendMessage(renderSuccessMessage(getCompletionMessage(completedFlowType)));
      })
      .catch(function (error) {
        appendMessage(renderBotMessage(error.message || "Unable to save chat details right now."));
      });
  }

  function restartLeadFlowEditing() {
    if (!leadFlow) {
      return;
    }

    leadFlow.answers = [];
    leadFlow.step = 0;
    leadFlow.awaitingConfirmation = false;
    leadFlow.stepValues = leadFlow.stepValues.slice();
    appendMessage(renderBotMessage("Let's update your details."));
    appendMessage(renderStructuredFormMessage(leadFlow.flowType, 0, leadFlow.questions[0]));
    setInputbarVisibility(false);
  }

  function getViewportWidth() {
    if (window.visualViewport && window.visualViewport.width) {
      return window.visualViewport.width;
    }

    return window.innerWidth || document.documentElement.clientWidth || 0;
  }

  function getViewportHeight() {
    if (window.visualViewport && window.visualViewport.height) {
      return window.visualViewport.height;
    }

    return window.innerHeight || document.documentElement.clientHeight || 0;
  }

  function getCookie(name) {
    var match = document.cookie.match(new RegExp("(^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)"));
    return match ? decodeURIComponent(match[2]) : "";
  }

  function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }

    document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/; SameSite=Lax";
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function getActiveOffsets() {
    var isMobileViewport = getViewportWidth() <= 520;

    return {
      right: isMobileViewport ? defaultMobileOffset : defaultRightOffset,
      bottom: isMobileViewport ? defaultMobileOffset : defaultBottomOffset
    };
  }

  function applyDefaultAnchoredPosition() {
    var offsets = getActiveOffsets();

    widget.style.left = "auto";
    widget.style.top = "auto";
    widget.style.right = Math.round(offsets.right) + "px";
    widget.style.bottom = Math.round(offsets.bottom) + "px";
    updatePanelPlacement();
  }

  function savePosition(left, top) {
    return;
  }

  function applySavedPosition() {
    applyDefaultAnchoredPosition();
  }

  function resetWidgetToViewportEdge() {
    applyDefaultAnchoredPosition();
  }

  function updatePanelPlacement() {
    widget.classList.remove("trz-align-left");
    widget.classList.add("trz-align-right");
    widget.classList.remove("trz-open-down");
    widget.classList.add("trz-open-up");
  }

  function openPanel() {
    resetWidgetToViewportEdge();
    updatePanelPlacement();
    widget.classList.add("trz-panel-open");
    panel.classList.add("trz-open");
    input.focus();
  }

  function closePanel() {
    widget.classList.remove("trz-panel-open");
    panel.classList.remove("trz-open");
    setInputbarVisibility(true);
  }

  function submitMessage(text) {
    if (!text) {
      return;
    }

    if (advanceLeadFlow(text)) {
      return;
    }

    appendMessage(renderUserMessage(text));
    input.value = "";

    window.setTimeout(function () {
      appendMessage(renderBotMessage("Please pick a service or CTA so we can guide you better."));
    }, 300);
  }

  toggle.addEventListener("click", function () {
    if (hasDragged) {
      hasDragged = false;
      return;
    }

    openPanel();
  });

  menuButton.addEventListener("click", function () {
    closePanel();
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    submitMessage(input.value.trim());
  });

  widget.addEventListener("click", function (event) {
    var target = event.target.closest("[data-message]");
    var message = target ? target.getAttribute("data-message") : "";
    var flowType = target ? target.getAttribute("data-flow") : "";
    if (!message) {
      return;
    }

    openPanel();
    startLeadFlow((target && target.getAttribute("data-prefill-service")) || message, flowType || "common");
  });

  body.addEventListener("submit", function (event) {
    var structuredForm = event.target.closest(".trz-chat-inline-form");
    var elements;
    var values = {};
    var i;
    var answer;
    var currentStep;
    var currentFlow;

    if (!structuredForm) {
      return;
    }

    event.preventDefault();

    currentFlow = structuredForm.getAttribute("data-structured-flow");
    currentStep = Number(structuredForm.getAttribute("data-step") || 0);
    elements = structuredForm.querySelectorAll("input, textarea, select");

    for (i = 0; i < elements.length; i += 1) {
      if (elements[i].type === "file") {
        if (!elements[i].files || !elements[i].files.length) {
          elements[i].focus();
          return;
        }
        values[elements[i].name] = {
          name: elements[i].files[0].name,
          file: elements[i].files[0]
        };
        continue;
      }

      if (!elements[i].value.trim()) {
        elements[i].focus();
        return;
      }
      values[elements[i].name] = elements[i].value.trim();
    }

    if (leadFlow && leadFlow.stepValues) {
      leadFlow.stepValues[currentStep] = values;
    }

    structuredForm.closest(".trz-chat-message").remove();
    answer = formatStructuredAnswer(currentFlow, currentStep, values);
    if (answer) {
      advanceLeadFlow(answer);
    }
  });

  body.addEventListener("click", function (event) {
    var actionButton = event.target.closest("[data-confirm-action]");
    var action;

    if (!actionButton) {
      return;
    }

    action = actionButton.getAttribute("data-confirm-action");
    actionButton.closest(".trz-chat-message").remove();

    if (action === "edit") {
      restartLeadFlowEditing();
      return;
    }

    finalizeLeadFlowSubmission();
  });

  body.addEventListener("input", function (event) {
    var target = event.target;

    if (!target.matches("input[data-digits-only='true']")) {
      return;
    }

    target.value = target.value.replace(/\D/g, "");
  });

  dragHandle.addEventListener("pointerdown", function (event) {
    dragState = {
      startX: event.clientX,
      startY: event.clientY,
      initialLeft: widget.offsetLeft,
      initialTop: widget.offsetTop
    };
    hasDragged = false;
    dragHandle.setPointerCapture(event.pointerId);
  });

  dragHandle.addEventListener("pointermove", function (event) {
    if (!dragState) {
      return;
    }

    var deltaX = event.clientX - dragState.startX;
    var deltaY = event.clientY - dragState.startY;

    if (!hasDragged && (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4)) {
      hasDragged = true;
    }

    if (!hasDragged) {
      return;
    }

    return;
  });

  dragHandle.addEventListener("pointerup", function (event) {
    if (!dragState) {
      return;
    }

    dragHandle.releasePointerCapture(event.pointerId);

    if (hasDragged) {
      savePosition(widget.offsetLeft, widget.offsetTop);
      window.setTimeout(function () {
        hasDragged = false;
      }, 0);
    }

    dragState = null;
  });

  dragHandle.addEventListener("pointercancel", function () {
    dragState = null;
    hasDragged = false;
  });

  window.addEventListener("resize", function () {
    applyDefaultAnchoredPosition();
  });
})();
