import { Localized } from '@/types/timeline'

type LegalParagraph = { type: 'text'; content: string }
type LegalList = { type: 'list'; items: string[] }
type LegalLink = { type: 'link'; text: string; href: string }

type LegalBlock = LegalParagraph | LegalList | LegalLink

export type LegalSection = {
  heading: string
  blocks: LegalBlock[]
}

export type LegalDocument = {
  title: string
  lastUpdated: string
  sections: LegalSection[]
}

const termsContent: Localized<LegalDocument> = {
  en: {
    title: 'Terms and Conditions',
    lastUpdated: '2024-01-01',
    sections: [
      {
        heading: 'Welcome',
        blocks: [
          {
            type: 'text',
            content:
              "These terms and conditions outline the rules and regulations for the use of Kenneth Wong's Website, located at https://www.kwwdev.com/.",
          },
          {
            type: 'text',
            content:
              'By accessing this website we assume you accept these terms and conditions. Do not continue to use Kenneth Wong if you do not agree to take all of the terms and conditions stated on this page.',
          },
          {
            type: 'text',
            content:
              'The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company\'s terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client\'s needs in respect of provision of the Company\'s stated services, in accordance with and subject to, prevailing law of Hong Kong.',
          },
        ],
      },
      {
        heading: 'Cookies',
        blocks: [
          {
            type: 'text',
            content:
              "We employ the use of cookies. By accessing Kenneth Wong, you agreed to use cookies in agreement with the Kenneth Wong's Privacy Policy.",
          },
          {
            type: 'text',
            content:
              "Most interactive websites use cookies to let us retrieve the user's details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.",
          },
        ],
      },
      {
        heading: 'License',
        blocks: [
          {
            type: 'text',
            content:
              'Unless otherwise stated, Kenneth Wong and/or its licensors own the intellectual property rights for all material on Kenneth Wong. All intellectual property rights are reserved. You may access this from Kenneth Wong for your own personal use subjected to restrictions set in these terms and conditions.',
          },
          { type: 'text', content: 'You must not:' },
          {
            type: 'list',
            items: [
              'Republish material from Kenneth Wong',
              'Sell, rent or sub-license material from Kenneth Wong',
              'Reproduce, duplicate or copy material from Kenneth Wong',
              'Redistribute content from Kenneth Wong',
            ],
          },
        ],
      },
      {
        heading: 'Hyperlinking to our Content',
        blocks: [
          {
            type: 'text',
            content:
              'The following organizations may link to our Website without prior written approval:',
          },
          {
            type: 'list',
            items: [
              'Government agencies',
              'Search engines',
              'News organizations',
              'Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses',
              'System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site',
            ],
          },
          {
            type: 'text',
            content:
              "These organizations may link to our home page, to publications or to other Website information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party's site.",
          },
          {
            type: 'text',
            content:
              "No use of Kenneth Wong's logo or other artwork will be allowed for linking absent a trademark license agreement.",
          },
        ],
      },
      {
        heading: 'iFrames',
        blocks: [
          {
            type: 'text',
            content:
              'Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.',
          },
        ],
      },
      {
        heading: 'Content Liability',
        blocks: [
          {
            type: 'text',
            content:
              'We shall not be held responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.',
          },
        ],
      },
      {
        heading: 'Your Privacy',
        blocks: [
          {
            type: 'text',
            content: 'Please read our Privacy Policy.',
          },
        ],
      },
      {
        heading: 'Reservation of Rights',
        blocks: [
          {
            type: 'text',
            content:
              'We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amend these terms and conditions and its linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.',
          },
        ],
      },
      {
        heading: 'Disclaimer',
        blocks: [
          {
            type: 'text',
            content:
              'To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:',
          },
          {
            type: 'list',
            items: [
              'Limit or exclude our or your liability for death or personal injury',
              'Limit or exclude our or your liability for fraud or fraudulent misrepresentation',
              'Limit any of our or your liabilities in any way that is not permitted under applicable law',
              'Exclude any of our or your liabilities that may not be excluded under applicable law',
            ],
          },
          {
            type: 'text',
            content:
              'As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.',
          },
        ],
      },
    ],
  },
  'zh-TW': {
    title: '使用條款',
    lastUpdated: '2024-01-01',
    sections: [
      {
        heading: '歡迎',
        blocks: [
          {
            type: 'text',
            content:
              '這些條款和條件概述了使用 Kenneth Wong 網站（位於 https://www.kwwdev.com/）的規則和規定。',
          },
          {
            type: 'text',
            content:
              '訪問本網站即表示您接受這些條款和條件。如果您不同意本頁面上列出的所有條款和條件，請不要繼續使用 Kenneth Wong。',
          },
          {
            type: 'text',
            content:
              '以下術語適用於這些條款和條件、隱私聲明和免責聲明通知以及所有協議："客戶"、"您"和"您的"是指您，即登錄本網站並遵守公司條款和條件的人。"公司"、"我們自己"、"我們"是指我們的公司。所有條款均指根據香港現行法律提供服務所需的報價、接受和付款考慮。',
          },
        ],
      },
      {
        heading: 'Cookies',
        blocks: [
          {
            type: 'text',
            content:
              '我們使用 cookies。訪問 Kenneth Wong 即表示您同意根據 Kenneth Wong 的隱私政策使用 cookies。',
          },
          {
            type: 'text',
            content:
              '大多數互動網站使用 cookies 來獲取每次訪問的用戶詳細信息。我們的網站使用 cookies 來啟用某些區域的功能，使訪問我們網站的人更加方便。',
          },
        ],
      },
      {
        heading: '許可',
        blocks: [
          {
            type: 'text',
            content:
              '除非另有說明，Kenneth Wong 及/或其許可方擁有 Kenneth Wong 上所有材料的知識產權。保留所有知識產權。您可以在受這些條款和條件限制的情況下，從 Kenneth Wong 訪問這些內容供個人使用。',
          },
          { type: 'text', content: '您不得：' },
          {
            type: 'list',
            items: [
              '重新發布 Kenneth Wong 的材料',
              '出售、出租或再許可 Kenneth Wong 的材料',
              '複製或拷貝 Kenneth Wong 的材料',
              '重新分發 Kenneth Wong 的內容',
            ],
          },
        ],
      },
      {
        heading: '超連結',
        blocks: [
          {
            type: 'text',
            content: '以下組織可以在未經事先書面批准的情況下連結到我們的網站：',
          },
          {
            type: 'list',
            items: [
              '政府機構',
              '搜索引擎',
              '新聞組織',
              '線上目錄分銷商',
              '系統範圍內的認證企業',
            ],
          },
          {
            type: 'text',
            content:
              '這些組織可以連結到我們的主頁、出版物或其他網站信息，前提是連結：(a) 不具欺騙性；(b) 不虛假暗示贊助、認可或批准；(c) 符合連結方網站的上下文。',
          },
        ],
      },
      {
        heading: 'iFrames',
        blocks: [
          {
            type: 'text',
            content:
              '未經事先批准和書面許可，您不得在我們的網頁周圍創建以任何方式改變我們網站視覺呈現或外觀的框架。',
          },
        ],
      },
      {
        heading: '內容責任',
        blocks: [
          {
            type: 'text',
            content:
              '我們不對出現在您網站上的任何內容負責。您同意保護我們免受您網站上出現的所有索賠。',
          },
        ],
      },
      {
        heading: '您的隱私',
        blocks: [{ type: 'text', content: '請閱讀我們的隱私政策。' }],
      },
      {
        heading: '權利保留',
        blocks: [
          {
            type: 'text',
            content:
              '我們保留要求您刪除所有或任何特定連結的權利。您同意在收到請求後立即刪除所有連結。我們也保留隨時修改這些條款和條件的權利。',
          },
        ],
      },
      {
        heading: '免責聲明',
        blocks: [
          {
            type: 'text',
            content:
              '在適用法律允許的最大範圍內，我們排除與本網站及使用本網站有關的所有陳述、保證和條件。本免責聲明不會：',
          },
          {
            type: 'list',
            items: [
              '限制或排除因死亡或人身傷害的責任',
              '限制或排除因欺詐的責任',
              '以適用法律不允許的方式限制任何責任',
              '排除適用法律不允許排除的任何責任',
            ],
          },
          {
            type: 'text',
            content:
              '只要本網站及其信息和服務是免費提供的，我們將不對任何性質的損失或損害承擔責任。',
          },
        ],
      },
    ],
  },
  ja: {
    title: '利用規約',
    lastUpdated: '2024-01-01',
    sections: [
      {
        heading: 'ようこそ',
        blocks: [
          {
            type: 'text',
            content:
              'これらの利用規約は、Kenneth Wongのウェブサイト（https://www.kwwdev.com/）の使用に関する規則と規定を定めたものです。',
          },
          {
            type: 'text',
            content:
              '本ウェブサイトにアクセスすることにより、これらの利用規約に同意したものとみなされます。本ページに記載されたすべての条件に同意しない場合は、Kenneth Wongの使用を中止してください。',
          },
          {
            type: 'text',
            content:
              '以下の用語は、本利用規約、プライバシーステートメント、免責事項通知、およびすべての契約に適用されます。「クライアント」「お客様」はこのウェブサイトにログインし、会社の利用規約に従う方を指します。「会社」「私たち」は当社を指します。すべての条件は香港の現行法に準拠します。',
          },
        ],
      },
      {
        heading: 'Cookie',
        blocks: [
          {
            type: 'text',
            content:
              '当社はCookieを使用しています。Kenneth Wongにアクセスすることにより、Kenneth Wongのプライバシーポリシーに従ってCookieの使用に同意したものとみなされます。',
          },
          {
            type: 'text',
            content:
              'ほとんどのインタラクティブなウェブサイトは、訪問ごとにユーザーの詳細を取得するためにCookieを使用しています。',
          },
        ],
      },
      {
        heading: 'ライセンス',
        blocks: [
          {
            type: 'text',
            content:
              '特に記載がない限り、Kenneth Wongおよび/またはそのライセンサーは、Kenneth Wong上のすべての素材の知的財産権を所有しています。すべての知的財産権は留保されています。',
          },
          { type: 'text', content: '以下の行為は禁止されています：' },
          {
            type: 'list',
            items: [
              'Kenneth Wongの素材の再公開',
              'Kenneth Wongの素材の販売、賃貸、またはサブライセンス',
              'Kenneth Wongの素材の複製',
              'Kenneth Wongのコンテンツの再配布',
            ],
          },
        ],
      },
      {
        heading: 'ハイパーリンク',
        blocks: [
          {
            type: 'text',
            content:
              '以下の組織は、事前の書面による承認なしに当社のウェブサイトにリンクすることができます：',
          },
          {
            type: 'list',
            items: [
              '政府機関',
              '検索エンジン',
              '報道機関',
              'オンラインディレクトリ配布者',
              'システム全体の認定企業',
            ],
          },
          {
            type: 'text',
            content:
              'これらの組織は、リンクが(a)欺瞞的でなく、(b)虚偽のスポンサーシップを暗示せず、(c)リンク元サイトの文脈に適合する限り、リンクすることができます。',
          },
        ],
      },
      {
        heading: 'iFrame',
        blocks: [
          {
            type: 'text',
            content:
              '事前の承認と書面による許可なしに、当社のウェブページの視覚的な表示や外観を変更するフレームを作成することはできません。',
          },
        ],
      },
      {
        heading: 'コンテンツの責任',
        blocks: [
          {
            type: 'text',
            content:
              '当社は、お客様のウェブサイトに表示されるコンテンツについて責任を負いません。',
          },
        ],
      },
      {
        heading: 'プライバシー',
        blocks: [
          {
            type: 'text',
            content: '当社のプライバシーポリシーをお読みください。',
          },
        ],
      },
      {
        heading: '権利の留保',
        blocks: [
          {
            type: 'text',
            content:
              '当社は、すべてのリンクまたは特定のリンクの削除を要求する権利を留保します。当社はまた、いつでもこれらの利用規約を修正する権利を留保します。',
          },
        ],
      },
      {
        heading: '免責事項',
        blocks: [
          {
            type: 'text',
            content:
              '適用法で許可される最大限の範囲で、当社はウェブサイトおよびウェブサイトの使用に関するすべての表明、保証および条件を除外します。本免責事項は：',
          },
          {
            type: 'list',
            items: [
              '死亡または人身傷害に対する責任の制限または除外',
              '詐欺に対する責任の制限または除外',
              '適用法で許可されない方法での責任の制限',
              '適用法で除外できない責任の除外',
            ],
          },
          {
            type: 'text',
            content:
              'ウェブサイトおよび情報・サービスが無料で提供される限り、当社はいかなる性質の損失または損害についても責任を負いません。',
          },
        ],
      },
    ],
  },
  ar: {
    title: 'الشروط والأحكام',
    lastUpdated: '2024-01-01',
    sections: [
      {
        heading: 'مرحباً',
        blocks: [
          {
            type: 'text',
            content:
              'تحدد هذه الشروط والأحكام القواعد والأنظمة لاستخدام موقع Kenneth Wong الإلكتروني الموجود على https://www.kwwdev.com/.',
          },
          {
            type: 'text',
            content:
              'بالوصول إلى هذا الموقع نفترض أنك تقبل هذه الشروط والأحكام. لا تستمر في استخدام Kenneth Wong إذا كنت لا توافق على جميع الشروط والأحكام المذكورة في هذه الصفحة.',
          },
          {
            type: 'text',
            content:
              'تنطبق المصطلحات التالية على هذه الشروط والأحكام وبيان الخصوصية وإشعار إخلاء المسؤولية وجميع الاتفاقيات. جميع الشروط تشير إلى القانون السائد في هونغ كونغ.',
          },
        ],
      },
      {
        heading: 'ملفات تعريف الارتباط',
        blocks: [
          {
            type: 'text',
            content:
              'نستخدم ملفات تعريف الارتباط. بالوصول إلى Kenneth Wong، فإنك توافق على استخدام ملفات تعريف الارتباط وفقاً لسياسة الخصوصية الخاصة بـ Kenneth Wong.',
          },
          {
            type: 'text',
            content:
              'تستخدم معظم المواقع التفاعلية ملفات تعريف الارتباط لاسترجاع تفاصيل المستخدم في كل زيارة.',
          },
        ],
      },
      {
        heading: 'الترخيص',
        blocks: [
          {
            type: 'text',
            content:
              'ما لم يُذكر خلاف ذلك، يمتلك Kenneth Wong و/أو المرخصون له حقوق الملكية الفكرية لجميع المواد. جميع حقوق الملكية الفكرية محفوظة.',
          },
          { type: 'text', content: 'يجب عليك عدم:' },
          {
            type: 'list',
            items: [
              'إعادة نشر مواد من Kenneth Wong',
              'بيع أو تأجير مواد من Kenneth Wong',
              'نسخ أو تكرار مواد من Kenneth Wong',
              'إعادة توزيع محتوى من Kenneth Wong',
            ],
          },
        ],
      },
      {
        heading: 'الروابط التشعبية',
        blocks: [
          {
            type: 'text',
            content:
              'يمكن للمنظمات التالية الربط بموقعنا دون موافقة كتابية مسبقة:',
          },
          {
            type: 'list',
            items: [
              'الوكالات الحكومية',
              'محركات البحث',
              'المنظمات الإخبارية',
              'موزعو الأدلة الإلكترونية',
              'الشركات المعتمدة على مستوى النظام',
            ],
          },
          {
            type: 'text',
            content:
              'يمكن لهذه المنظمات الربط بصفحتنا الرئيسية طالما أن الرابط: (أ) ليس مضللاً؛ (ب) لا يوحي زوراً بالرعاية أو الموافقة؛ (ج) يتناسب مع سياق موقع الطرف الرابط.',
          },
        ],
      },
      {
        heading: 'الإطارات',
        blocks: [
          {
            type: 'text',
            content:
              'بدون موافقة وإذن كتابي مسبق، لا يجوز لك إنشاء إطارات حول صفحات الويب الخاصة بنا تغير العرض المرئي لموقعنا.',
          },
        ],
      },
      {
        heading: 'مسؤولية المحتوى',
        blocks: [
          {
            type: 'text',
            content:
              'لن نتحمل المسؤولية عن أي محتوى يظهر على موقعك. أنت توافق على حمايتنا من جميع المطالبات.',
          },
        ],
      },
      {
        heading: 'خصوصيتك',
        blocks: [
          { type: 'text', content: 'يرجى قراءة سياسة الخصوصية الخاصة بنا.' },
        ],
      },
      {
        heading: 'حجز الحقوق',
        blocks: [
          {
            type: 'text',
            content:
              'نحتفظ بالحق في طلب إزالة جميع الروابط. كما نحتفظ بالحق في تعديل هذه الشروط والأحكام في أي وقت.',
          },
        ],
      },
      {
        heading: 'إخلاء المسؤولية',
        blocks: [
          {
            type: 'text',
            content:
              'إلى أقصى حد يسمح به القانون المعمول به، نستبعد جميع الإقرارات والضمانات والشروط المتعلقة بموقعنا. لن يقوم إخلاء المسؤولية هذا بـ:',
          },
          {
            type: 'list',
            items: [
              'تقييد المسؤولية عن الوفاة أو الإصابة الشخصية',
              'تقييد المسؤولية عن الاحتيال',
              'تقييد المسؤوليات بطريقة غير مسموح بها',
              'استبعاد المسؤوليات التي لا يمكن استبعادها',
            ],
          },
          {
            type: 'text',
            content:
              'طالما أن الموقع والمعلومات والخدمات مقدمة مجاناً، فلن نكون مسؤولين عن أي خسارة أو ضرر.',
          },
        ],
      },
    ],
  },
}

const privacyContent: Localized<LegalDocument> = {
  en: {
    title: 'Privacy Policy',
    lastUpdated: '2024-01-01',
    sections: [
      {
        heading: 'Introduction',
        blocks: [
          {
            type: 'text',
            content:
              'At Kenneth Wong, accessible from https://kwwdev.com/, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Kenneth Wong and how we use it.',
          },
          {
            type: 'text',
            content:
              'If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.',
          },
          {
            type: 'text',
            content:
              'This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in Kenneth Wong. This policy is not applicable to any information collected offline or via channels other than this website.',
          },
        ],
      },
      {
        heading: 'Consent',
        blocks: [
          {
            type: 'text',
            content:
              'By using our website, you hereby consent to our Privacy Policy and agree to its terms.',
          },
        ],
      },
      {
        heading: 'Information we collect',
        blocks: [
          {
            type: 'text',
            content:
              'The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.',
          },
          {
            type: 'text',
            content:
              'If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.',
          },
        ],
      },
      {
        heading: 'How we use your information',
        blocks: [
          {
            type: 'text',
            content:
              'We use the information we collect in various ways, including to:',
          },
          {
            type: 'list',
            items: [
              'Provide, operate, and maintain our website',
              'Improve, personalize, and expand our website',
              'Understand and analyze how you use our website',
              'Develop new products, services, features, and functionality',
              'Communicate with you for customer service and updates',
              'Find and prevent fraud',
            ],
          },
        ],
      },
      {
        heading: 'Log Files',
        blocks: [
          {
            type: 'text',
            content:
              'Kenneth Wong follows a standard procedure of using log files. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.',
          },
        ],
      },
      {
        heading: 'Cookies and Web Beacons',
        blocks: [
          {
            type: 'text',
            content:
              "Like any other website, Kenneth Wong uses \"cookies\". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.",
          },
        ],
      },
      {
        heading: 'Third Party Privacy Policies',
        blocks: [
          {
            type: 'text',
            content:
              "Kenneth Wong's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information.",
          },
          {
            type: 'text',
            content:
              "You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.",
          },
        ],
      },
      {
        heading: 'GDPR Data Protection Rights',
        blocks: [
          {
            type: 'text',
            content:
              'We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:',
          },
          {
            type: 'list',
            items: [
              'The right to access – You have the right to request copies of your personal data',
              'The right to rectification – You have the right to request that we correct any information you believe is inaccurate',
              'The right to erasure – You have the right to request that we erase your personal data, under certain conditions',
              'The right to restrict processing – You have the right to request that we restrict the processing of your personal data',
              'The right to object to processing – You have the right to object to our processing of your personal data',
              'The right to data portability – You have the right to request that we transfer the data we have collected to another organization, or directly to you',
            ],
          },
          {
            type: 'text',
            content:
              'If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.',
          },
        ],
      },
      {
        heading: "Children's Information",
        blocks: [
          {
            type: 'text',
            content:
              'Kenneth Wong does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.',
          },
        ],
      },
    ],
  },
  'zh-TW': {
    title: '隱私政策',
    lastUpdated: '2024-01-01',
    sections: [
      {
        heading: '簡介',
        blocks: [
          {
            type: 'text',
            content:
              '在 Kenneth Wong（可通過 https://kwwdev.com/ 訪問），我們的主要優先事項之一是訪客的隱私。本隱私政策文件包含 Kenneth Wong 收集和記錄的信息類型以及我們如何使用這些信息。',
          },
          {
            type: 'text',
            content:
              '如果您有其他問題或需要更多關於隱私政策的信息，請隨時與我們聯繫。',
          },
        ],
      },
      {
        heading: '同意',
        blocks: [
          {
            type: 'text',
            content: '使用我們的網站即表示您同意我們的隱私政策並同意其條款。',
          },
        ],
      },
      {
        heading: '我們收集的信息',
        blocks: [
          {
            type: 'text',
            content:
              '要求您提供的個人信息以及要求您提供的原因，將在我們要求您提供個人信息時向您說明。',
          },
          {
            type: 'text',
            content:
              '如果您直接與我們聯繫，我們可能會收到您的其他信息，例如您的姓名、電子郵件地址、電話號碼、消息內容以及您選擇提供的任何其他信息。',
          },
        ],
      },
      {
        heading: '我們如何使用您的信息',
        blocks: [
          { type: 'text', content: '我們以各種方式使用收集的信息，包括：' },
          {
            type: 'list',
            items: [
              '提供、運營和維護我們的網站',
              '改善、個性化和擴展我們的網站',
              '了解和分析您如何使用我們的網站',
              '開發新產品、服務、功能',
              '與您溝通以提供客戶服務和更新',
              '發現和防止欺詐',
            ],
          },
        ],
      },
      {
        heading: '日誌文件',
        blocks: [
          {
            type: 'text',
            content:
              'Kenneth Wong 遵循使用日誌文件的標準程序。日誌文件收集的信息包括 IP 地址、瀏覽器類型、ISP、日期和時間戳、引用/退出頁面以及點擊次數。這些信息不與任何個人身份信息相關聯。',
          },
        ],
      },
      {
        heading: 'Cookies 和網絡信標',
        blocks: [
          {
            type: 'text',
            content:
              '與其他網站一樣，Kenneth Wong 使用「cookies」。這些 cookies 用於存儲信息，包括訪客的偏好以及訪客訪問的頁面。這些信息用於根據訪客的瀏覽器類型和/或其他信息自定義網頁內容，以優化用戶體驗。',
          },
        ],
      },
      {
        heading: '第三方隱私政策',
        blocks: [
          {
            type: 'text',
            content:
              'Kenneth Wong 的隱私政策不適用於其他廣告商或網站。建議您查閱這些第三方廣告服務器的相關隱私政策以獲取更詳細的信息。',
          },
          { type: 'text', content: '您可以選擇通過瀏覽器設置禁用 cookies。' },
        ],
      },
      {
        heading: 'GDPR 數據保護權利',
        blocks: [
          {
            type: 'text',
            content:
              '我們希望確保您充分了解您的所有數據保護權利。每位用戶都有權：',
          },
          {
            type: 'list',
            items: [
              '訪問權 – 您有權要求獲取個人數據副本',
              '更正權 – 您有權要求更正不準確的信息',
              '刪除權 – 在某些條件下，您有權要求刪除個人數據',
              '限制處理權 – 在某些條件下，您有權要求限制處理個人數據',
              '反對處理權 – 在某些條件下，您有權反對處理個人數據',
              '數據可攜權 – 您有權要求將數據傳輸給另一組織或直接傳輸給您',
            ],
          },
          {
            type: 'text',
            content:
              '如果您提出請求，我們有一個月的時間回覆您。如果您希望行使任何這些權利，請與我們聯繫。',
          },
        ],
      },
      {
        heading: '兒童信息',
        blocks: [
          {
            type: 'text',
            content:
              'Kenneth Wong 不會故意收集 13 歲以下兒童的任何個人身份信息。如果您認為您的孩子在我們的網站上提供了此類信息，我們強烈建議您立即與我們聯繫，我們將盡最大努力及時刪除此類信息。',
          },
        ],
      },
    ],
  },
  ja: {
    title: 'プライバシーポリシー',
    lastUpdated: '2024-01-01',
    sections: [
      {
        heading: 'はじめに',
        blocks: [
          {
            type: 'text',
            content:
              'Kenneth Wong（https://kwwdev.com/ でアクセス可能）では、訪問者のプライバシーを最優先事項の一つとしています。本プライバシーポリシーには、Kenneth Wongが収集・記録する情報の種類とその使用方法が記載されています。',
          },
          {
            type: 'text',
            content:
              'プライバシーポリシーに関するご質問がある場合は、お気軽にお問い合わせください。',
          },
        ],
      },
      {
        heading: '同意',
        blocks: [
          {
            type: 'text',
            content:
              '当社のウェブサイトを使用することにより、本プライバシーポリシーに同意し、その条件に同意したものとみなされます。',
          },
        ],
      },
      {
        heading: '収集する情報',
        blocks: [
          {
            type: 'text',
            content:
              '提供をお願いする個人情報およびその理由は、個人情報の提供をお願いする時点で明確にお伝えします。',
          },
          {
            type: 'text',
            content:
              '直接お問い合わせいただいた場合、お名前、メールアドレス、電話番号、メッセージの内容など、追加の情報を受け取る場合があります。',
          },
        ],
      },
      {
        heading: '情報の使用方法',
        blocks: [
          {
            type: 'text',
            content: '収集した情報は以下を含む様々な方法で使用します：',
          },
          {
            type: 'list',
            items: [
              'ウェブサイトの提供、運営、維持',
              'ウェブサイトの改善、パーソナライズ、拡張',
              'ウェブサイトの使用状況の分析',
              '新しい製品、サービス、機能の開発',
              'カスタマーサービスおよびアップデートのためのコミュニケーション',
              '不正行為の発見と防止',
            ],
          },
        ],
      },
      {
        heading: 'ログファイル',
        blocks: [
          {
            type: 'text',
            content:
              'Kenneth Wongはログファイルの使用における標準的な手順に従っています。ログファイルによって収集される情報には、IPアドレス、ブラウザの種類、ISP、日時スタンプ、参照/離脱ページ、クリック数が含まれます。これらは個人を特定できる情報とはリンクされていません。',
          },
        ],
      },
      {
        heading: 'Cookieとウェブビーコン',
        blocks: [
          {
            type: 'text',
            content:
              '他のウェブサイトと同様に、Kenneth Wongは「Cookie」を使用しています。これらのCookieは、訪問者の設定やアクセスしたページなどの情報を保存するために使用されます。',
          },
        ],
      },
      {
        heading: '第三者のプライバシーポリシー',
        blocks: [
          {
            type: 'text',
            content:
              'Kenneth Wongのプライバシーポリシーは、他の広告主やウェブサイトには適用されません。詳細については、各第三者広告サーバーのプライバシーポリシーをご参照ください。',
          },
          {
            type: 'text',
            content: 'ブラウザの設定からCookieを無効にすることができます。',
          },
        ],
      },
      {
        heading: 'GDPRデータ保護権',
        blocks: [
          {
            type: 'text',
            content:
              'すべてのデータ保護権を十分にご理解いただきたいと考えています。すべてのユーザーには以下の権利があります：',
          },
          {
            type: 'list',
            items: [
              'アクセス権 – 個人データのコピーを要求する権利',
              '訂正権 – 不正確と思われる情報の訂正を要求する権利',
              '消去権 – 一定の条件下で個人データの消去を要求する権利',
              '処理制限権 – 一定の条件下で個人データの処理制限を要求する権利',
              '処理異議権 – 一定の条件下で個人データの処理に異議を申し立てる権利',
              'データポータビリティ権 – 収集したデータの他組織への移転を要求する権利',
            ],
          },
          {
            type: 'text',
            content:
              'リクエストを行った場合、1ヶ月以内に回答いたします。これらの権利を行使したい場合は、お問い合わせください。',
          },
        ],
      },
      {
        heading: 'お子様の情報',
        blocks: [
          {
            type: 'text',
            content:
              'Kenneth Wongは、13歳未満のお子様から個人を特定できる情報を故意に収集することはありません。お子様がこの種の情報を当社のウェブサイトで提供したと思われる場合は、直ちにお問い合わせください。',
          },
        ],
      },
    ],
  },
  ar: {
    title: 'سياسة الخصوصية',
    lastUpdated: '2024-01-01',
    sections: [
      {
        heading: 'مقدمة',
        blocks: [
          {
            type: 'text',
            content:
              'في Kenneth Wong، المتاح على https://kwwdev.com/، تعتبر خصوصية زوارنا من أولوياتنا الرئيسية. يحتوي مستند سياسة الخصوصية هذا على أنواع المعلومات التي يتم جمعها وتسجيلها وكيفية استخدامها.',
          },
          {
            type: 'text',
            content: 'إذا كانت لديك أسئلة إضافية، فلا تتردد في الاتصال بنا.',
          },
        ],
      },
      {
        heading: 'الموافقة',
        blocks: [
          {
            type: 'text',
            content:
              'باستخدام موقعنا، فإنك توافق على سياسة الخصوصية الخاصة بنا وتوافق على شروطها.',
          },
        ],
      },
      {
        heading: 'المعلومات التي نجمعها',
        blocks: [
          {
            type: 'text',
            content:
              'سيتم توضيح المعلومات الشخصية المطلوب تقديمها وأسباب طلبها عند نقطة الطلب.',
          },
          {
            type: 'text',
            content:
              'إذا اتصلت بنا مباشرة، فقد نتلقى معلومات إضافية عنك مثل اسمك وعنوان بريدك الإلكتروني ورقم هاتفك.',
          },
        ],
      },
      {
        heading: 'كيف نستخدم معلوماتك',
        blocks: [
          {
            type: 'text',
            content: 'نستخدم المعلومات التي نجمعها بطرق مختلفة، بما في ذلك:',
          },
          {
            type: 'list',
            items: [
              'توفير وتشغيل وصيانة موقعنا',
              'تحسين وتخصيص وتوسيع موقعنا',
              'فهم وتحليل كيفية استخدامك لموقعنا',
              'تطوير منتجات وخدمات وميزات جديدة',
              'التواصل معك لخدمة العملاء والتحديثات',
              'اكتشاف ومنع الاحتيال',
            ],
          },
        ],
      },
      {
        heading: 'ملفات السجل',
        blocks: [
          {
            type: 'text',
            content:
              'يتبع Kenneth Wong إجراءً قياسياً لاستخدام ملفات السجل. تشمل المعلومات المجمعة عناوين IP ونوع المتصفح ومزود خدمة الإنترنت والطوابع الزمنية وصفحات الإحالة/الخروج. هذه المعلومات غير مرتبطة بأي معلومات يمكن التعرف عليها شخصياً.',
          },
        ],
      },
      {
        heading: 'ملفات تعريف الارتباط',
        blocks: [
          {
            type: 'text',
            content:
              'مثل أي موقع آخر، يستخدم Kenneth Wong "ملفات تعريف الارتباط" لتخزين المعلومات بما في ذلك تفضيلات الزوار والصفحات التي تمت زيارتها.',
          },
        ],
      },
      {
        heading: 'سياسات خصوصية الأطراف الثالثة',
        blocks: [
          {
            type: 'text',
            content:
              'لا تنطبق سياسة خصوصية Kenneth Wong على المعلنين أو المواقع الأخرى. ننصحك بمراجعة سياسات الخصوصية الخاصة بخوادم الإعلانات.',
          },
          {
            type: 'text',
            content:
              'يمكنك تعطيل ملفات تعريف الارتباط من خلال إعدادات المتصفح.',
          },
        ],
      },
      {
        heading: 'حقوق حماية البيانات GDPR',
        blocks: [
          {
            type: 'text',
            content:
              'نود التأكد من أنك على دراية كاملة بجميع حقوق حماية البيانات الخاصة بك. لكل مستخدم الحق في:',
          },
          {
            type: 'list',
            items: [
              'حق الوصول – لديك الحق في طلب نسخ من بياناتك الشخصية',
              'حق التصحيح – لديك الحق في طلب تصحيح المعلومات غير الدقيقة',
              'حق المحو – لديك الحق في طلب محو بياناتك الشخصية',
              'حق تقييد المعالجة – لديك الحق في طلب تقييد معالجة بياناتك',
              'حق الاعتراض – لديك الحق في الاعتراض على معالجة بياناتك',
              'حق نقل البيانات – لديك الحق في طلب نقل البيانات إلى منظمة أخرى',
            ],
          },
          {
            type: 'text',
            content: 'إذا قدمت طلباً، لدينا شهر واحد للرد عليك. للاتصال بنا.',
          },
        ],
      },
      {
        heading: 'معلومات الأطفال',
        blocks: [
          {
            type: 'text',
            content:
              'لا يقوم Kenneth Wong عن علم بجمع أي معلومات تعريف شخصية من الأطفال دون سن 13 عاماً. إذا كنت تعتقد أن طفلك قدم هذا النوع من المعلومات، نشجعك على الاتصال بنا فوراً.',
          },
        ],
      },
    ],
  },
}

export const getTermsContent = (lang: string): LegalDocument =>
  termsContent[lang] ?? termsContent.en

export const getPrivacyContent = (lang: string): LegalDocument =>
  privacyContent[lang] ?? privacyContent.en
