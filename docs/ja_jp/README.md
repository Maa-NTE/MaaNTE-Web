---
home: true
title: MaaNTE
topAlert:
  enabled: true
  label: 注意
  text: MaaNTE は公式チャンネルからのみダウンロードしてください。第三者による改変パッケージ、勧誘グループ、偽リポジトリ、有料代行ダウンロード詐欺にご注意ください。
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
      text: Neverness to Everness (NTE) 向け次世代自動化ツール
      tagline: 面倒な操作を自動化し、ゲーム体験をより快適に。
      image:
        src: /images/logo_256x256.png
        alt: MaaNTE Logo
      actions:
        - text: クイックスタート
          icon: mdi:file-document-outline
          link: /ja_jp/introduction/
          type: primary
        - text: オンラインマップ
          icon: fa7-solid:map-location-dot
          link: https://map.maante.org/
          type: primary
        - text: ダウンロード
          icon: fa7-solid:download
          type: primary
          children:
            - text: GitHub ダウンロード
              link: https://github.com/1bananachicken/MaaNTE/releases
              type: secondary
            - text: Mirror Chan ダウンロード
              link: https://mirrorchan.com/zh/projects?rid=MaaNTE
              type: secondary
        - text: お問い合わせ
          icon: fa7-solid:external-link-alt
          type: primary
          children:
            - text: QQ グループ
              link: /ja_jp/qq-group/
              type: secondary
            - text: Discord
              link: https://discord.com/invite/e6mPMRYQpR
              type: secondary
        - text: もっと見る
          icon: heroicons:ellipsis-horizontal-circle-16-solid
          children:
            - text: GitHub
              link: https://github.com/1bananachicken/MaaNTE
              type: primary
            - text: YouTube
              link: https://youtube.com/@MaaNTE-Official
              type: primary
            - text: Bilibili
              link: https://space.bilibili.com/3546893080594665/
              type: primary
            - text: Afdian
              link: https://afdian.com/a/MaaNTE
              type: primary
  - type: HomeIntro
    items:
      - title: 先進的フレームワーク、安心の安定性
        content: MaaNTE は <strong>MaaFramework</strong> を基盤に、画像認識と入力シミュレーション技術で機能を実現します。<br/>従来のスクリプト記録とは異なり、「誤って画面を離れてリソースを浪費する」事故は起こりません。
        align: left
      - title: オープンソース、コードの透明性
        content: MaaNTE は <strong>AGPL-3.0</strong> で公開されているオープンソースプロジェクトです。<br/>クローズドソースの不透明さとは異なり、すべてのコードが審査され、誰でもいつでも監査できます。
        align: right
        link:
          href: "https://github.com/1bananachicken/MaaNTE/"
          text: コードを確認する →
          alt: ソースコードを表示
      - title: コミュニティ主導、豊富な機能
        content: <strong>誰でも</strong>コードを提出し、MaaNTE に新機能を追加できます。<br/>日常タスクや都市の娯楽など、数十の機能が正式版に搭載されています。
        align: left
        link:
          href: "/ja_jp/introduction/"
          text: 詳しく見る →
          alt: 機能紹介を見る
  - type: features
    features:
      - title: 自動釣り
        details: 自動で大物を釣り上げ、自動売却・餌の自動購入・無限ループに対応
        icon: icon-park-outline:fishing
        link: introduction/HethereauHobbies/Fish.md
      - title: 自動回避と反撃
        details: 音声認識によるリアルタイム回避システム。ゲームの効果音を監視し、回避と反撃を自動発動。戦闘をより快適に
        icon: fa7-solid:bolt
        link: introduction\RealTimeAssist\SoundDodge.md
      - title: リアルタイムアシスト
        details: 自動拾得、ストーリー自動スキップ、テレポート自動クリック。面倒な操作を減らし、ゲーム体験をよりスムーズに
        icon: fa7-solid:clock
        link: introduction/RealTimeAssist/RealTime.md
      - title: ピンククロー強奪事件
        details: 「ピンククロー強奪事件」を自動周回し、報酬を簡単に獲得。両手を解放します
        icon: streamline-plump:pet-paw-solid
        link: introduction\HethereauHobbies\PinkPawHeist.md
      - title: 報酬受け取り
        details: デイリー報酬を自動で受け取り
        icon: fa7-solid:gift
        link: introduction\Daily\ClaimRewards.md
      - title: 自動コーヒー作成
        details: 「店長スペシャル」を自動化し、コーヒー作成から都市スタミナのフォンス farming まで全自動
        icon: mdi:coffee-maker-check-outline
        link: introduction\HethereauHobbies\MakeCoffee.md
      - title: 超強音
        details: 音ゲー「超強音」を自動演奏。自動選曲、連続演奏、フレームレート調整に対応。音ゲー報酬を簡単に獲得
        icon: fa7-solid:music
        link: introduction\HethereauHobbies\Rhythm.md
      - title: その他の機能
        details: 自動演奏、クイック拾得、報酬受け取り、お金の引き出し…さらなる自動化機能を続々追加中
        icon: heroicons:ellipsis-horizontal-circle-16-solid
        link: /ja_jp/introduction/
  - type: HomeIntro
    items:
      - title: オープンソース駆動、充実のドキュメント
        content: MaaNTE は <strong>MaaFramework</strong> 上に構築され、<strong>Pipeline タスク編成 + Python カスタムアクション</strong> のハイブリッドアーキテクチャを採用。<br/>JSON でノードフローを宣言し、テンプレートマッチング、OCR 文字認識、カスタム認識など多様なアルゴリズムに対応。<br/>開発者は新機能の拡張や新解像度への適応が容易です。
        align: center
        link:
          href: "/ja_jp/develop/"
          text: 開発ガイド →
          alt: 開発ガイド
  - type: custom
---
<CardGrid>
  <LinkCard icon="fa7-brands:github" title="GitHub" href="https://github.com/1bananachicken/MaaNTE/" />
  <LinkCard icon="fa7-brands:bilibili" title="Bilibili" href="https://space.bilibili.com/3546893080594665/" />
  <LinkCard icon="fa7-brands:qq" title="QQ" href="/ja_jp/qq-group/" />
  <LinkCard icon="fa7-brands:discord" title="Discord" href="https://discord.com/invite/e6mPMRYQpR" />
</CardGrid>
