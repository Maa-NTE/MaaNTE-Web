---
home: true
title: MaaNTE
description: MaaNTE | MAA 异环小助手 — 由 MaaFramework 强力驱动的《异环》自动化辅助工具，支持自动钓鱼、实时闪避、粉爪大劫案、超强音等功能
head:
  - - meta
    - name: keywords
      content: MaaNTE,MAA,异环,Neverness to Everness,自动化,游戏辅助,MaaFramework,都市闲趣,实时辅助,开源
topAlert:
  enabled: true
  label: 提醒
  text: 请仅从官方渠道下载 MaaNTE。谨防第三方改包、引流群、假仓库和付费代下骗局。
  speed: 28
  backgroundColor: "#7f1d1d"
  textColor: "#fff7ed"
  borderColor: "rgba(255, 255, 255, 0.22)"
  badgeBackgroundColor: "#fef08a"
  badgeTextColor: "#7f1d1d"
config:
  - type: HHero
    full: true
    hero:
      name: MaaNTE
      text: 由 MaaFramework 强力驱动的《异环》自动化辅助工具
      tagline: MAA 异环小助手
      image:
        src: /images/logo_256x256.png
        alt: MaaNTE Logo
      actions:
        - text: 快速开始
          icon: mdi:file-document-outline
          link: userdocs/intro.md
          type: primary
        - text: 在线地图
          icon: fa7-solid:map-location-dot
          link: https://map.maante.org/
          type: primary
        - text: 下载
          icon: fa7-solid:download
          type: primary
          children:
            - text: GitHub 下载
              link: https://github.com/1bananachicken/MaaNTE/releases
              type: secondary
            - text: Mirror酱 下载
              link: https://mirrorchan.com/zh/projects?rid=MaaNTE
              type: secondary
            - text: 网盘下载
              type: secondary
              children:
              - text: 百度网盘
                link: https://pan.baidu.com/s/11QMC-aYfjfq52yco_UAwfg?pwd=tkmu
                type: secondary
              - text: 夸克网盘
                link: https://pan.quark.cn/s/4b70d06b913c?pwd=irqh
                type: secondary
            - text: QQ 群下载
              link: /zh_cn/qq-group/
              type: secondary
        - text: 联系我们
          icon: fa7-solid:external-link-alt
          type: primary
          children:
            - text: QQ 群
              link: /zh_cn/qq-group/
              type: secondary
            - text: Discord
              link: https://discord.com/invite/e6mPMRYQpR
              type: secondary
        - text: 更多
          icon: heroicons:ellipsis-horizontal-circle-16-solid
          children:
            - text: GitHub
              link: https://github.com/1bananachicken/MaaNTE
              type: primary
            - text: Bilibili
              link: https://space.bilibili.com/3546893080594665/
              type: primary
            - text: 爱发电
              link: https://afdian.com/a/MaaNTE
              type: primary
            - text: YouTube
              link: https://youtube.com/@MaaNTE-Official
              type: primary
  - type: HomeIntro
    items:
      - title: 框架先进，稳定无忧
        content: MaaNTE 基于 <strong>MaaFramework</strong> 开发，通过图像识别与模拟输入技术实现功能。<br>区别于传统脚本录制，不会出现录制脚本的"意外退出界面导致被花光资源"惨案。
        align: left
      - title: 开源工具，代码安全
        content: MaaNTE 以 <strong>AGPL-3.0</strong> 开源，源码均在 GitHub 发布。<br>区别于闭源项目的不确定性，我们的每一行代码都经过审查，接受任何人随时监督。
        align: right
        link:
          href: "https://github.com/1bananachicken/MaaNTE/"
          text: 我要验码 →
          alt: 查看源代码
      - title: 社区驱动，功能丰富
        content: <strong>任何人</strong>均能提交代码，为 MaaNTE 添加新的功能。<br>我们拥有数十项已经添加到正式版的功能，覆盖日常任务、都市闲趣等多个方面。
        align: left
        link:
          href: "/zh_cn/introduction/"
          text: 让我看看 →
          alt: 查看功能介绍
  - type: features
    features:
      - title: 自动钓鱼
        details: 自动帮你钓大鱼，支持自动卖鱼、自动购买鱼饵和无限循环
        icon: icon-park-outline:fishing
        link: introduction/HethereauHobbies/Fish.md
      - title: 自动闪避与反击
        details: 基于音频识别的实时闪避系统。监听游戏音效，自动触发闪避和反击操作，让战斗更加从容
        icon: fa7-solid:bolt
        link: introduction/RealTimeAssist/SoundDodge.md
      - title: 实时辅助
        details: 自动拾取、自动跳过剧情、自动点击传送，减少繁琐操作，让游戏体验更加流畅自然
        icon: fa7-solid:clock
        link: introduction/RealTimeAssist/RealTime.md
      - title: 粉爪大劫案
        details: 自动刷取「粉爪大劫案」，轻松获取奖励，解放你的双手
        icon: streamline-plump:pet-paw-solid
        link: introduction/HethereauHobbies/PinkPawHeist.md
      - title: 奖励领取
        details: 自动领取每日奖励
        icon: fa7-solid:gift
        link: introduction/Daily/ClaimRewards.md
      - title: 自动做咖啡
        details: 进行「店长特供」玩法，自动制作咖啡，全自动完成都市体力刷取方斯
        icon: mdi:coffee-maker-check-outline
        link: introduction/HethereauHobbies/MakeCoffee.md
      - title: 超强音
        details: 自动演奏音游「超强音」，支持自动选曲、连续演奏和帧率调节。轻松获取音游奖励
        icon: fa7-solid:music
        link: introduction/HethereauHobbies/Rhythm.md
      - title: 更多功能
        details: 自动弹琴、快速拾取、领取奖励、取钱……更多自动化功能持续更新中
        icon: heroicons:ellipsis-horizontal-circle-16-solid
        link: /zh_cn/introduction/
  - type: HomeIntro
    items:
      - title: 开源驱动，文档完善
        content: MaaNTE 基于 <strong>MaaFramework</strong> 构建，采用 <strong>Pipeline 任务编排 + Python 自定义动作</strong> 的混合架构。<br/>通过 JSON 声明节点流程，支持模板匹配、OCR 文字识别、自定义识别等多种算法。<br/>开发者可以轻松扩展新功能、适配新分辨率。
        align: center
        link:
          href: "/zh_cn/develop/"
          text: 开发指南 →
          alt: 开发指南
  - type: custom
---
<CardGrid>
  <LinkCard icon="fa7-brands:github" title="GitHub" href="https://github.com/1bananachicken/MaaNTE/" />
  <LinkCard icon="fa7-brands:bilibili" title="Bilibili" href="https://space.bilibili.com/3546893080594665/" />
  <LinkCard icon="fa7-brands:qq" title="QQ" href="/zh_cn/qq-group/" />
  <LinkCard icon="fa7-brands:discord" title="Discord" href="https://discord.com/invite/e6mPMRYQpR" />
</CardGrid>
