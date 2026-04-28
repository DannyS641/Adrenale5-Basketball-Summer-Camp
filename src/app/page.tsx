import Image from "next/image";
import Countdown from "@/components/Countdown";
import RegistrationForm from "@/components/RegistrationForm";
import ScheduleSection from "@/components/ScheduleSection";
import StatCounters from "@/components/StatCounters";

const highlights = [
  {
    title: "Elite Skill Labs",
    description:
      "Two-a-day sessions focused on shooting mechanics, footwork, and game-speed finishing.",
  },
  {
    title: "Film, Mindset, Recovery & Nutrition",
    description:
      "Breakdown rooms, mental reps, and in-game decision training led by pro coaches. Mobility labs, recovery baths, and athlete fuel planning built into the week.",
  },
  {
    title: "Live Competition",
    description:
      "Daily scrimmages with officiating, stat tracking, and player development notes.",
  },
  {
    title: "Attractions & Landmarks",
    description: "NBA live games",
  },
];

const schedule = [
  {
    day: "Friday, July 10th",
    title: "Arrival & First Taste of Vegas",
    items: [
      "All day: Arrival of delegates at Harry Reid International Airport (LAS); A5 staff greeting and transport to accommodations.",
      "15:00 - 17:00: Hotel check-in and settling in.",
      "17:30 - 19:00: Welcome orientation and program kick-off; distribution of A5 gear (shooting shirts, backpacks, itineraries).",
      "19:30 - 21:00: Welcome dinner; casual team bonding at the hotel or a local family-style restaurant.",
      "21:00: Curfew and room checks.",
    ],
  },
  {
    day: "Saturday, July 11th",
    title: "Hoops & Higher Education",
    items: [
      "07:00 - 08:30: Breakfast at the hotel.",
      "09:00 - 11:30: UNLV campus tour; see academic buildings, student union, and dorms to get a feel for a Division I campus lifestyle.",
      "11:30 - 13:00: Lunch at the UNLV Student Union.",
      "13:30 - 17:00: NBA Summer League Session 1; head to the Thomas & Mack Center and watch future NBA stars compete.",
      "17:30 - 19:00: Dinner (casual dining near the Strip).",
      "19:30 - 21:30: The Las Vegas Strip experience; guided, supervised walk to take in the iconic sights, architecture, and atmosphere of Las Vegas Boulevard.",
      "22:00: Curfew and room checks.",
    ],
  },
  {
    day: "Sunday, July 12th",
    title: "Hoover Dam Adventure & Nightlife History",
    items: [
      "06:30 - 07:30: Breakfast.",
      "08:00 - 14:00: Hoover Dam excursion; 4-5-hour tour with Mike O'Callaghan-Pat Tillman Memorial Bridge stop and a walking tour across the top of the dam to learn about this engineering marvel.",
      "Lunch included during or immediately following the tour.",
      "14:00 - 17:00: Rest and recovery time at the hotel (pool optional).",
      "17:30 - 19:30: NBA Summer League Session 2 at Thomas & Mack Center.",
      "20:00 - 22:00: Fremont Street Experience; light shows, street performers, and classic neon signs of downtown.",
      "22:30: Curfew and room checks.",
    ],
  },
  {
    day: "Monday, July 13th",
    title: "NBA Con & Behind-the-Scenes Access",
    items: [
      "07:00 - 08:30: Breakfast.",
      "09:00 - 12:00: NBA Con at the Las Vegas Convention Center; athletes can explore interactive fan experiences, purchase exclusive gear, and see basketball exhibits.",
      "12:00 - 13:30: Lunch.",
      "14:00 - 16:00: NBA League shootaround experience with behind-the-scenes access to a team practice facility or shootaround at the convention center (subject to NBA team schedules).",
      "16:00 - 18:00: NBA Summer League Session 3.",
      "18:30 - 19:30: Dinner.",
      "20:00 - 21:00: Packing and preparation for travel; briefing on LA leg and training expectations.",
      "21:00: Early curfew.",
    ],
  },
  {
    day: "Tuesday, July 14th",
    title: "Travel to Los Angeles & Leisure",
    items: [
      "03:30: Wake up call.",
      "04:00 - 05:00: Light morning workout; mandatory movement and stretch session to shake off the Vegas fatigue and prepare for travel.",
      "05:30 - 06:30: Breakfast / boxed breakfast.",
      "07:00: Depart for Harry Reid International Airport (LAS).",
      "09:30 - 11:00: Flight to Los Angeles (LAX).",
      "11:30 - 13:00: Transfer to hotel and check-in.",
      "13:00 - 17:00: Leisure and recovery time; lunch on your own (per diem provided).",
      "17:30 - 19:00: Team dinner.",
      "19:30 - 21:00: Nightlife activity at Venice Beach Boardwalk; casual evening stroll to see the iconic beach, street performers, basketball courts, and skate park.",
      "21:00: Curfew.",
    ],
  },
  {
    day: "Wednesday, July 15th",
    title: "Training Camp Day 1 (The Grind Begins)",
    items: [
      "03:30: Wake up call.",
      "04:00 - 06:00: Morning workout (Session 1); high-energy skill development focusing on ball handling, footwork, and finishing at the rim.",
      "06:30 - 08:00: Breakfast and rest.",
      "08:30 - 10:30: Film study and guest speaker; breakdown of NBA/college game footage and discussion on the path to professional basketball.",
      "10:30 - 11:00: Light snack.",
      "11:00 - 15:00: On-court drills and scrimmages (Session 2) covering defensive principles, offensive sets, and live 5-on-5 action.",
      "15:00 - 17:00: Rest period.",
      "17:00 - 18:30: Dinner.",
      "19:00 - 21:00: The Grove and Farmers Market.",
      "21:00: Curfew.",
    ],
  },
  {
    day: "Thursday, July 16th",
    title: "Training Camp Day 2 (Repetition & Refinement)",
    items: [
      "03:30: Wake up call.",
      "04:00 - 06:00: Morning workout (Session 1) focusing on shooting form, consistency, and conditioning.",
      "06:30 - 08:00: Breakfast and rest.",
      "08:30 - 10:30: Film study and guest speaker focusing on basketball IQ and decision making (NBA or WNBA legend TBC).",
      "10:30 - 11:00: Light snack.",
      "11:00 - 15:00: On-court drills and scrimmages (Session 2) emphasizing position-specific work and competitive 5-on-5 scenarios.",
      "15:00 - 17:00: Rest period.",
      "17:00 - 18:30: Dinner.",
      "19:00 - 21:00: Santa Monica Pier.",
      "21:00: Curfew.",
    ],
  },
  {
    day: "Friday, July 17th",
    title: "Academic & Recruitment Tour (Rest Day)",
    items: [
      "07:00 - 08:30: Breakfast (later start for recovery).",
      "09:00 - 11:30: Guided tour of UCLA (Royce Hall, Powell Library, and Janss Steps); learn about admissions and athletic programs.",
      "11:30 - 13:00: Lunch in Westwood Village.",
      "13:30 - 15:30: Guided tour of USC; visit the admission center and see athletic facilities.",
      "15:30 - 17:30: JUCO tour to understand the community college pathway to Division I sports.",
      "17:30 - 18:30: Dinner.",
      "19:00 - 22:00: Theme park night (Universal Studios Hollywood or Six Flags Magic Mountain).",
      "22:00: Return to hotel.",
      "00:00: Special late-night curfew.",
    ],
  },
  {
    day: "Saturday, July 18th",
    title: "Tournament Day & Awards Banquet",
    items: [
      "03:30: Wake up call.",
      "04:00 - 05:30: Pre-game warm-up and shootaround.",
      "05:30 - 07:00: Breakfast.",
      "08:00 - 12:00: A5 Tournament pool play (round-robin) at a local sports complex/college gym.",
      "12:00 - 13:30: Lunch and rest.",
      "13:30 - 17:00: A5 Tournament playoffs and championship; medals awarded to the winning team.",
      "17:30 - 19:00: Rest and prepare for banquet.",
      "19:00 - 21:30: Awards banquet and closing ceremony with guest speakers and NBA legends present.",
      "21:30 - 23:00: Free time and bonding.",
      "23:00: Curfew.",
    ],
  },
  {
    day: "Sunday, July 19th",
    title: "Departure",
    items: [
      "06:30 - 08:30: Breakfast and check-out; final team breakfast.",
      "09:00: Depart for Los Angeles International Airport (LAX) with group transfers.",
      "Ongoing: Flights home; conclusion of the 2026 A5 Summer Athletic Immersion Program.",
    ],
  },
];

const activities = [
  {
    title: "Morning Skill Pods",
    location: "Main Arena",
    image: "/activities/skills-default.jpg",
    hoverImage: "/activities/skills-hover.jpg",
  },
  {
    title: "Vert & Speed Lab",
    location: "Performance Studio",
    image: "/activities/vert-default.jpg",
    hoverImage: "/activities/vert-hover.jpg",
  },
  {
    title: "Evening Scrimmages",
    location: "Champions Court",
    image: "/activities/scrimmage-default.jpg",
    hoverImage: "/activities/scrimmage-hover.jpg",
  },
];

const essentials = [
  {
    title: "Guest Speakers",
    detail: "Learn from former players, coaches, and industry leaders.",
    image:
      "https://images.pexels.com/photos/6767216/pexels-photo-6767216.jpeg?cs=srgb&dl=pexels-cottonbro-6767216.jpg&fm=jpg",
  },
  {
    title: "Performance Games",
    detail: "Live, competitive play with coaching feedback.",
    image:
      "https://images.pexels.com/photos/30986363/pexels-photo-30986363.jpeg?cs=srgb&dl=pexels-franco-monsalvo-252430633-30986363.jpg&fm=jpg",
  },
  {
    title: "Workshops",
    detail: "Film study, mindset, and skill lab sessions.",
    image:
      "https://images.pexels.com/photos/32688082/pexels-photo-32688082.jpeg?cs=srgb&dl=pexels-coen-crevels-1241774106-32688082.jpg&fm=jpg",
  },
  {
    title: "Scouts",
    detail: "Exposure to evaluators and recruitment pathways.",
    image:
      "https://images.pexels.com/photos/6767013/pexels-photo-6767013.jpeg?cs=srgb&dl=pexels-cottonbro-6767013.jpg&fm=jpg",
  },
];

const coaches = [
  {
    name: "Coach Eric Glenn",
    role: "NBA Shooting Coach",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Coach Osaris Nulls",
    role: "Adrenale 5 Head Coach",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Coach Poncho Hodges",
    role: "NBA Player Development",
    image:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=800&q=80",
  },
];

const testimonials = [
  {
    quote:
      "The detail was unreal. My footwork and shot prep changed in one week.",
    name: "Wilson J.",
    detail: "2025 Camp MVP",
  },
  {
    quote:
      "Coaches actually teach the why behind every rep. Best camp experience.",
    name: "Kelvin D.",
    detail: "Varsity Starter",
  },
];

export default function Home() {
  return (
    <div className="relative bg-transparent">
      <div className="fixed inset-0 -z-10">
        <video
          className="h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src="/bkg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/45" />
      </div>

      <header className="relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-transparent" />

        <nav className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 pt-6 text-sm uppercase tracking-[0.3em]">
          <div className="flex items-center gap-3">
            <span className="font-display text-xl tracking-[0.4em]">
              ADRENALE 5
            </span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#highlights" className="text-white/80 hover:text-white">
              Highlights
            </a>
            <a href="#schedule" className="text-white/80 hover:text-white">
              Schedule
            </a>
            <a href="#coaches" className="text-white/80 hover:text-white">
              Coaches
            </a>
            <a href="#register" className="text-white/80 hover:text-white">
              Register
            </a>
          </div>
          <a
            href="#register"
            className="rounded-full border border-white/40 px-5 py-2 text-xs font-semibold text-white/90 transition hover:border-white hover:text-white"
          >
            Reserve
          </a>
        </nav>

        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-8 px-6 pb-20 pt-16 md:gap-10 md:pb-32 md:pt-32">
          <div className="max-w-2xl space-y-5 md:space-y-6">
            <p className="text-xs uppercase tracking-[0.5em] text-citrus">
              10-Day Basketball Summer Camp
            </p>
            <h1 className="font-display text-4xl uppercase tracking-[0.1em] sm:text-5xl md:text-7xl">
              Discover Your Next Level
            </h1>
            <p className="text-base text-white/80 md:text-lg">
              A high-intensity training week for athletes ages 13-18 from Africa
              (18 years old, if you have a waiver). Skill labs, live games, film
              rooms, and recovery. All under one roof.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#register"
                className="rounded-full bg-citrus px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-night transition hover:bg-[#aac85d]"
              >
                Reserve a Spot
              </a>
              <a
                href="#schedule"
                className="rounded-full border border-white/50 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:border-white"
              >
                View Schedule
              </a>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            <Countdown />
            <div className="rounded-full bg-white/10 px-4 py-2 text-xs text-white/80 md:text-sm">
              8:30am - 6:00pm daily
            </div>
            <div className="rounded-full bg-white/10 px-4 py-2 text-xs text-white/80 md:text-sm">
              Los Angeles, California
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section
          id="highlights"
          className="mx-auto max-w-6xl px-6 py-12 md:py-20"
        >
          <div className="rounded-[36px] bg-cloud/95 px-6 py-8 shadow-[0_25px_60px_rgba(15,23,42,0.18)] ring-1 ring-white/60 md:px-10 md:py-12">
            <div className="text-center space-y-3">
              <p className="text-xs uppercase tracking-[0.5em] text-ember">
                Train smarter
              </p>
              <h2 className="font-display text-3xl uppercase tracking-[0.1em] md:text-4xl">
                Camp Highlights
              </h2>
            </div>
            <div className="mt-8 grid gap-5 md:mt-12 md:grid-cols-2 md:gap-6">
              {highlights.map((item, index) => (
                <div
                  key={item.title}
                  className="rounded-3xl bg-cloud px-6 py-5 shadow-[0_20px_50px_rgba(15,23,42,0.08)] md:px-8 md:py-6"
                >
                  <p className="text-sm uppercase tracking-[0.4em] text-ember">
                    0{index + 1}
                  </p>
                  <h3 className="mt-3 font-display text-3xl uppercase tracking-[0.08em]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-stone">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="schedule" className="bg-cloud/95">
          <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.5em] text-ember">
                  Day by day
                </p>
                <h2 className="font-display text-3xl uppercase tracking-[0.1em] md:text-4xl">
                  10-Day Global Experience
                </h2>
                <p className="text-sm text-stone md:text-base">
                  Experiencing professional basketball at the NBA Summer League,
                  followed by an intensive training camp in Los Angeles focused
                  on skill development, competition, and exposure to collegiate
                  and professional pathways.
                </p>
              </div>
              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80"
                  alt="Basketball player training"
                  width={460}
                  height={320}
                  className="h-[220px] w-full rounded-3xl object-cover shadow-[0_25px_50px_rgba(15,23,42,0.2)] md:h-[280px]"
                />
                <div className="absolute -bottom-5 -left-5 hidden rounded-3xl bg-forest px-5 py-4 text-white shadow-xl md:block">
                  <p className="text-xs uppercase tracking-[0.4em] text-citrus">
                    Focus
                  </p>
                  <p className="mt-2 font-display text-2xl uppercase tracking-[0.1em]">
                    Full itinerary
                  </p>
                </div>
              </div>
            </div>
            <ScheduleSection schedule={schedule} />
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-12 md:py-20">
          <div className="text-center space-y-3">
            <p className="text-xs uppercase tracking-[0.5em] text-ember">
              Essentials
            </p>
            <h2 className="font-display text-3xl uppercase tracking-[0.1em] md:text-4xl">
              Camp Essentials
            </h2>
          </div>
          <div className="mt-8 grid gap-6 md:mt-12 md:grid-cols-4">
            {essentials.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl bg-cloud px-6 py-5 text-center shadow-[0_20px_50px_rgba(15,23,42,0.08)]"
              >
                <div className="relative mx-auto mb-4 h-20 w-20 overflow-hidden rounded-2xl">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <h3 className="font-display text-2xl uppercase tracking-[0.08em]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-stone">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-mist">
          <div className="mx-auto max-w-6xl px-6 py-12 md:py-20">
            <div className="text-center space-y-3">
              <p className="text-xs uppercase tracking-[0.5em] text-ember">
                Explore
              </p>
              <h2 className="font-display text-3xl uppercase tracking-[0.1em] md:text-4xl">
                Daily Activities
              </h2>
            </div>
            <div className="mt-8 grid gap-6 md:mt-12 md:grid-cols-3">
              {activities.map((activity) => (
                <div
                  key={activity.title}
                  className="group overflow-hidden rounded-3xl bg-cloud shadow-[0_20px_50px_rgba(15,23,42,0.08)]"
                >
                  <div className="relative h-56">
                    <Image
                      src={activity.image}
                      alt={activity.title}
                      fill
                      sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition duration-500 group-hover:opacity-0"
                    />
                    <Image
                      src={activity.hoverImage}
                      alt={`${activity.title} alternate view`}
                      fill
                      sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
                      className="object-cover opacity-0 transition duration-500 group-hover:opacity-100"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-xs uppercase tracking-[0.4em] text-ember">
                      {activity.location}
                    </p>
                    <h3 className="mt-3 font-display text-2xl uppercase tracking-[0.08em]">
                      {activity.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="coaches" className="mx-auto max-w-6xl px-6 py-12 md:py-20">
          <div className="rounded-[36px] bg-cloud/95 px-6 py-8 shadow-[0_25px_60px_rgba(15,23,42,0.18)] ring-1 ring-white/60 md:px-10 md:py-12">
            <div className="grid gap-10 md:grid-cols-2 md:items-center">
              <div className="space-y-5">
                <p className="text-xs uppercase tracking-[0.5em] text-ember">
                  Meet the staff
                </p>
                <h2 className="font-display text-3xl uppercase tracking-[0.1em] md:text-4xl">
                  Coaches Who Develop Pros
                </h2>
                <p className="text-stone">
                  Former pros, collegiate trainers, and skill coaches lead each
                  training group with hands-on feedback and accountability.
                </p>
                <div className="rounded-3xl bg-sand p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
                  <p className="text-sm uppercase tracking-[0.4em] text-ember">
                    Included
                  </p>
                  <p className="mt-2 text-lg text-ink">
                    Position-based coaching, nightly film rooms, and player
                    scorecards.
                  </p>
                </div>
              </div>
              <div className="grid gap-6">
                {coaches.map((coach) => (
                  <div
                    key={coach.name}
                    className="flex items-center gap-5 rounded-3xl bg-cloud p-5 shadow-[0_20px_50px_rgba(15,23,42,0.08)]"
                  >
                    <Image
                      src={coach.image}
                      alt={coach.name}
                      width={88}
                      height={88}
                      className="h-20 w-20 rounded-2xl object-cover"
                    />
                    <div>
                      <p className="font-display text-2xl uppercase tracking-[0.08em]">
                        {coach.name}
                      </p>
                      <p className="text-sm text-stone">{coach.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-12 md:pb-20">
          <StatCounters />
        </section>

        <section className="bg-cloud/95">
          <div className="mx-auto max-w-6xl px-6 py-12 md:py-20">
            <div className="text-center space-y-3">
              <p className="text-xs uppercase tracking-[0.5em] text-ember">
                Athlete stories
              </p>
              <h2 className="font-display text-3xl uppercase tracking-[0.1em] md:text-4xl">
                What Players Say
              </h2>
            </div>
            <div className="mt-8 grid gap-6 md:mt-12 md:grid-cols-2">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.name}
                  className="rounded-3xl bg-sand p-8 shadow-[0_20px_50px_rgba(15,23,42,0.08)]"
                >
                  <p className="text-lg text-ink">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <p className="mt-5 font-display text-2xl uppercase tracking-[0.08em]">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-stone">{testimonial.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="register" className="relative">
          <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-2 md:items-center md:py-20">
            <div className="space-y-6 text-white">
              <p className="text-xs uppercase tracking-[0.5em] text-citrus">
                Reserve your spot
              </p>
              <h2 className="font-display text-4xl uppercase tracking-[0.1em] md:text-5xl">
                Register for Camp
              </h2>
              <p className="text-white/75">
                Submit the form and our team will confirm placement and daily
                logistics.
              </p>
              <div className="rounded-3xl border border-white/20 bg-white/10 p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-citrus">
                  Camp Package
                </p>
                <p className="text-white/70">
                  Includes training kit, meals, and nightly recovery sessions.
                </p>
              </div>
            </div>
            <RegistrationForm />
          </div>
        </section>
      </main>

      <footer className="bg-forest/95 text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
          <div className="space-y-4">
            <p className="font-display text-2xl uppercase tracking-[0.2em]">
              Adrenale 5 Basketball
            </p>
            {/* <p className="text-white/70">
              10-day immersive training for athletes ready to compete at the next
              level.
            </p> */}
          </div>
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-citrus">
              Contact
            </p>
            <p className="text-white/70">Templar Global/Adrenale 5</p>
            <p className="text-white/70">Paul Oronsaye</p>
            <p className="text-white/70">
              <a href="mailto:poronnsaye@templarfoundation.org">
              poronnsaye@templarfoundation.org
            </a>
            </p>
            <p className="text-white/70">
              <a href="tel:+23408033762623">
              +234 (0)803 376 2623
            </a>
            </p>
          </div>
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-citrus">
              Location
            </p>
            <p className="text-white/70">611 Wilshere Boulevard</p>
            <p className="text-white/70">Los Angeles, CA 90035</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
