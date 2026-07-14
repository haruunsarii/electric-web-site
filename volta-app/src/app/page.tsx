import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <header className="relative w-full min-h-[530px] md:min-h-[819px] flex items-center justify-center overflow-hidden fade-in bg-surface-variant md:bg-transparent">
        <div className="absolute inset-0 z-0">
          <div
            className="bg-cover bg-center w-full h-full opacity-80 md:opacity-40 mix-blend-multiply md:mix-blend-normal"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDZYNVKEu4Nj9Lr4kRAMDL4W5cNbLP4hDqI_qTILjg18wgQ-0KKK7O0c6hOqUJpSiSGThi4isQGnQYm-_yOaAfP63-VDUnWTUjarK0lL8TJYLumpAfkVg3znAgqENmdz13YIldenzvzhJDcnonce3_taNRHvWxzS53biAE3YoSJBwbVbKMNA5ZmHkkPJBb-1cC5xzcXnQHu7pMeaSyGlw-TGHui2lNLeUzO1xSaEvQPzzoKYvdNZze9Ryxp3vCutqsJe0t9kS00-kD2')",
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-b from-surface/80 to-transparent md:to-background"></div>
        </div>

        {/* Mobile Content Block */}
        <div className="absolute bottom-0 left-0 p-md w-full md:hidden z-10">
          <div className="bg-surface-container-lowest/90 backdrop-blur-md p-md rounded border border-outline-variant shadow-[0_4px_12px_rgba(15,23,42,0.08)]">
            <span className="bg-primary text-on-primary font-label-technical rounded-sm px-xs py-[2px] uppercase text-[10px] tracking-widest mb-xs inline-block">
              Endüstriyel Sınıf
            </span>
            <h1 className="font-headline-lg-mobile text-primary mb-xs">
              Güvenilir Enerji Çözümleri
            </h1>
            <p className="font-body-sm text-on-surface-variant mb-sm">
              Yüksek performanslı elektrik ekipmanları ile projelerinizi güvence altına alın.
            </p>
          </div>
        </div>

        {/* Desktop Content Block */}
        <div className="relative z-10 max-w-container-max mx-auto px-gutter text-center hidden md:flex flex-col items-center gap-md">
          <span className="font-label-technical text-label-technical text-on-surface-variant bg-surface-container px-xs py-base rounded-sm uppercase tracking-widest border border-outline-variant">
            Endüstriyel Çözümler
          </span>
          <h1 className="font-display-lg text-display-lg text-primary max-w-3xl leading-tight">
            Yüksek Kaliteli Elektrik ve Aydınlatma Çözümleri
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mt-sm">
            Profesyonel projeleriniz için güvenilir, uzun ömürlü ve yüksek performanslı endüstriyel ekipmanlar. Mühendislik ve mimari ihtiyaçlarınız için tasarlandı.
          </p>
          <div className="flex gap-sm mt-md">
            <Link
              href="#kategoriler"
              className="bg-primary text-on-primary font-button-text text-button-text px-lg py-sm rounded hover:bg-primary-container transition-colors uppercase shadow-sm border border-transparent"
            >
              Ürünleri İncele
            </Link>
            <Link
              href="/katalog-ve-fiyat-listesi"
              className="bg-transparent text-primary font-button-text text-button-text px-lg py-sm rounded hover:bg-surface-container transition-colors uppercase border border-primary flex items-center gap-xs"
            >
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                download
              </span>
              Katalog İndir
            </Link>
          </div>
        </div>
      </header>

      {/* Categories / Bento Grid */}
      <section className="max-w-container-max mx-auto px-gutter py-xl fade-in" id="kategoriler">
        <div className="flex justify-between items-end mb-lg gap-sm">
          <div>
            <h2 className="font-headline-lg text-headline-lg md:text-headline-lg text-primary mb-xs">Kategoriler</h2>
            <p className="font-body-md text-body-md text-on-surface-variant hidden md:block">
              Tüm endüstriyel ve ticari ihtiyaçlarınız için geniş ürün yelpazesi.
            </p>
          </div>
          <Link
            href="/kategoriler"
            className="font-button-text text-button-text text-secondary hover:underline flex items-center gap-base"
          >
            Tümünü Gör <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-sm auto-rows-[240px]">
          {/* Ampul (Bulbs) */}
          <Link
            href="/kategori/ampul"
            className="bento-card group relative overflow-hidden rounded-lg border border-outline-variant bg-surface cursor-pointer col-span-1 md:col-span-2 row-span-2 shadow-sm hover:shadow-md transition-shadow"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out opacity-80 group-hover:scale-105"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDORtBX0hjkTdSD1E70tbmQ6LFD7vvDvH5iH9IVzXSam8tByB4Pa5ugl6jgOpSX2VF6KQ2DYSOxUu7EgByncWS3gVUmTmEZb6hy3GHhK7BOcdHmiOqtadvVdf3aw4OZ-HGRqhLlTe56nqC2hiNHmkav51cOUDBkspfkw-Fc29GgPaq0Fjg5pxHiwStL9k-L8Ka0CRMMdMOO_z61OYUQ0n-CukXpcLjhIC1xBPkllhMRtRYou5l3AeHiQIXNj2lIG0pYivVItKWLg6gn')",
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-md w-full">
              <div className="flex items-center gap-xs mb-xs text-on-primary">
                <span className="material-symbols-outlined">lightbulb</span>
                <h3 className="font-headline-md text-headline-md">Ampul</h3>
              </div>
              <p className="font-body-sm text-body-sm text-surface-container-highest opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                Enerji tasarruflu LED çözümleri ve endüstriyel aydınlatma.
              </p>
            </div>
          </Link>

          {/* Led Paneller */}
          <Link
            href="/kategori/led-paneller"
            className="bento-card group relative overflow-hidden rounded-lg border border-outline-variant bg-surface cursor-pointer col-span-1 row-span-1 shadow-sm hover:shadow-md transition-shadow"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out opacity-60 group-hover:scale-105"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDoZYNDuKqcRm_48-gIUVLRPvbCNpBXm7nhpdNtZ9uC5GIWTH7vaQ2yEZ5_SjF9is2w_TeVLLI2fl61u5fpXNHBp9WiXfxv-7ajnR54LreOV7t9fuyDmCZmWpTLJYhN64AWdBbm7gaoWzGch8bUwD7QyxpnRVrm6FvmSWCajbswDmCZWGxp0UrfYtPrXRypXxwZmmDmw4HeoTePAXjbThj-lhVx-mhPryblKYv4jhZ-9P9-zWkB_yrQufDTocnAQ7x08999YoQZsHz-')",
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-sm w-full">
              <div className="flex items-center gap-xs text-primary mb-base">
                <span className="material-symbols-outlined">grid_view</span>
                <h3 className="font-button-text text-button-text">Led Paneller</h3>
              </div>
            </div>
          </Link>

          {/* Ziller */}
          <Link
            href="/kategori/ziller"
            className="bento-card group relative overflow-hidden rounded-lg border border-outline-variant bg-surface cursor-pointer col-span-1 row-span-1 shadow-sm hover:shadow-md transition-shadow"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out opacity-60 group-hover:scale-105"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCwau-kczWViq4Wss6lHmRPOZAGy744CKr9CYh2ZTxkSVmUgEW-t4dpWoYjvUomy1HFInt_jtIdaYGNmTY-wVRfT0dB0HfGzzCMFTx5s59k926rD1dEgdQ5jyknALDj5vCrxCNtG-PvzUC1Nw7zaJNgMkkOTj67SF0E3YzsjMttKPAMHsBJqsL3kBfSdkVTuLNrSM2Q5vQExHT4valGMaF7V3FpJfIba9-mamhwdewyZtqOHRkek3z-As3dhztluKq4Lp4VHMUuvV-E')",
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-sm w-full">
              <div className="flex items-center gap-xs text-primary mb-base">
                <span className="material-symbols-outlined">notifications_active</span>
                <h3 className="font-button-text text-button-text">Ziller</h3>
              </div>
            </div>
          </Link>

          {/* Sigortalar */}
          <Link
            href="/kategori/sigortalar"
            className="bento-card group relative overflow-hidden rounded-lg border border-outline-variant bg-surface cursor-pointer col-span-1 md:col-span-2 row-span-1 shadow-sm hover:shadow-md transition-shadow"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out opacity-60 group-hover:scale-105"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBneKAH9F9FSfzr-qUYJMadtx8-aHL_KWvoT0vu6Xe4imINgN3NGJqcqlzQQDZV6V_GGH23AvJ1xzRXhQMzIHDeaMfzf4ABlZJPoDdzXFTlGkrjzHlr882jV_rdazoD5oBgaYUwcIlm63VPzCTrbGX59uOZszh55C1_Z1_iA8k0V1W68nrK0fQ_4b-ehVX5MUD3T8GGaImGGvJBz4jlMxazU1H82JEbZU5DB1p_3f2_ZUUuHHCAQXl8xCiICMVvpkRgp0JCCuzl039I')",
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-sm w-full">
              <div className="flex items-center gap-xs text-primary mb-base">
                <span className="material-symbols-outlined">settings_input_component</span>
                <h3 className="font-button-text text-button-text">Sigortalar</h3>
              </div>
            </div>
          </Link>

          {/* Bant Armatür (I'll point this to a generic place or a specific category if needed) */}
          <Link
            href="/kategori/bant-armatur"
            className="bento-card group relative overflow-hidden rounded-lg border border-outline-variant bg-surface cursor-pointer col-span-1 row-span-1 shadow-sm hover:shadow-md transition-shadow"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out opacity-60 group-hover:scale-105"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCk9LUoT2zMA-Q_q8RpzU-crEE-0MOG5j_Zd8zPSYh7pTX8FdMyXypioCHkHIZiWWfPmnNlUQGUIP_LazNbiEGULeTGYlo2W27e0QlSY2-Tq_j1-6HQdBfSt8-Xxs8wG8SVXMbZfDjqZd3khNFBF-nrZjIpPTgy2RwjLrm2nTLk5qOMA7IOasyRZP-s4w3FKUpjq3V-fdY_I4QhuSOWEp13lh7Vm7VQkTFtr6Pq4eSAKS1cH8UZmIpCI600cxwCTGEXNH2uBiC1pcuL')",
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-sm w-full">
              <div className="flex items-center gap-xs text-primary mb-base">
                <span className="material-symbols-outlined">linear_scale</span>
                <h3 className="font-button-text text-button-text">Bant Armatür</h3>
              </div>
            </div>
          </Link>

          {/* Bahçe Armatür */}
          <Link
            href="/kategori/bahce-armatur"
            className="bento-card group relative overflow-hidden rounded-lg border border-outline-variant bg-surface cursor-pointer col-span-1 row-span-1 shadow-sm hover:shadow-md transition-shadow"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out opacity-60 group-hover:scale-105"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD3Cg39qq4cmqVSioZFH7tczKhS3K8XJ_rh0vBAo8EEbh3reBFpb-VxFDcPUkxI_hnHTh00W93PzSHLgIVyG2koJY7g9ZT-XgJPOYqTx5cb1wagZJ6OaKol8rCyt_0RPUd5WtjQeGViy3HcHO17q42P2p5v1d_yBdNWwanPlsonCdc-qdsn7Vmw3vv_hQhvv2ylK6aWrDWdGG0QDhXrwd7Trg3IdJ01cenuautO9L682r738qXWkND4Tua3bmqqikCxhWM6jrZye_uV')",
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-sm w-full">
              <div className="flex items-center gap-xs text-primary mb-base">
                <span className="material-symbols-outlined">yard</span>
                <h3 className="font-button-text text-button-text">Bahçe Armatür</h3>
              </div>
            </div>
          </Link>

          {/* Projektör */}
          <Link
            href="/kategori/projektor"
            className="bento-card group relative overflow-hidden rounded-lg border border-outline-variant bg-surface cursor-pointer col-span-1 md:col-span-2 row-span-1 shadow-sm hover:shadow-md transition-shadow"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out opacity-60 group-hover:scale-105"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBaaj6azpfsTsOjN0H6WDLjOlIhP3MKZ4vDBUUKqru5BFX3p2qQzj0y7SZZ-3kYX5DZ0PF58h7aGgnpxoJC0SSvu4LvfJHTwNMMgMA4Xm-ibwNqT5DXzh56JEsHODE1XmXOaEA10-Uqhv7XX-GMdn29NJm4jnWEv6_0ecSTqTGzdFbnnxu0jLpV8511e-bY_uxRo-P0ptatr_lR34hoVFCWA0Rk9KcJfp005Ca9P3CrnFIEWJM5uwWpRx4YeBTScBbc1_ePVvklUydT')",
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-sm w-full">
              <div className="flex items-center gap-xs text-primary mb-base">
                <span className="material-symbols-outlined">flashlight_on</span>
                <h3 className="font-button-text text-button-text">Projektör</h3>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}
