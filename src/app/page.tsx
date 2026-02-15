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
    title: "Film + Mindset",
    description:
      "Breakdown rooms, mental reps, and in-game decision training led by pro coaches.",
  },
  {
    title: "Live Competition",
    description:
      "Daily scrimmages with officiating, stat tracking, and player development notes.",
  },
  {
    title: "Recovery + Nutrition",
    description:
      "Mobility labs, recovery baths, and athlete fuel planning built into the week.",
  },
];

const schedule = [
  {
    day: "Day 1",
    title: "Foundations & Baseline",
    detail: "Movement assessment, ball control, shot form audit.",
  },
  {
    day: "Day 2",
    title: "Shooting Lab",
    detail: "Range building, footwork patterns, catch-and-shoot reps.",
  },
  {
    day: "Day 3",
    title: "Defense + Footwork",
    detail: "Closeouts, lateral speed, on-ball pressure sequences.",
  },
  {
    day: "Day 4",
    title: "Playmaking",
    detail: "Reads off the pick-and-roll, passing windows, vision drills.",
  },
  {
    day: "Day 5",
    title: "Finishing School",
    detail: "Rim reads, contact finishes, touch off the glass.",
  },
  {
    day: "Day 6",
    title: "Live Games",
    detail: "Full-court competition, film review, coach feedback.",
  },
  {
    day: "Day 7",
    title: "Showcase + Celebration",
    detail: "Family showcase, awards, and next-step development plans.",
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
    title: "Performance Shoes",
    detail: "Break them in before day one for full-court comfort.",
    image: "/essentials/kobe-protro.avif",
  },
  {
    title: "Hydration Pack",
    detail: "Refill stations are available all day long.",
    image: "/essentials/nike-bottle.jpg",
  },
  {
    title: "Recovery Kit",
    detail: "Bands, roller, and post-practice recovery tools.",
    image: "/essentials/arb-recovery.jpg",
  },
  {
    title: "Camp Journal",
    detail: "Track goals, notes, and coach feedback.",
    image:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80",
  },
];

const coaches = [
  {
    name: "Coach L. Brooks",
    role: "Former G-League Guard",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Coach A. Sterling",
    role: "WNBA Skills Director",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Coach J. Perez",
    role: "NBA Player Development",
    image:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=800&q=80",
  },
];

const testimonials = [
  {
    quote:
      "The detail was unreal. My footwork and shot prep changed in one week.",
    name: "Maya L.",
    detail: "2025 Camp MVP",
  },
  {
    quote:
      "Coaches actually teach the why behind every rep. Best camp experience.",
    name: "Zion K.",
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
            <div className="h-10 w-10 rounded-full bg-citrus" />
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
              7-Day Basketball Summer Camp
            </p>
            <h1 className="font-display text-4xl uppercase tracking-[0.1em] sm:text-5xl md:text-7xl">
              Discover Your Next Level
            </h1>
            <p className="text-base text-white/80 md:text-lg">
              A high-intensity training week for athletes ages 10-17. Skill
              labs, live games, film rooms, and recovery. All under one roof.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#register"
                className="rounded-full bg-citrus px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-night transition hover:bg-[#e1a93f]"
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
        <section id="highlights" className="mx-auto max-w-6xl px-6 py-12 md:py-20">
          <div className="rounded-[36px] bg-white/55 px-6 py-8 shadow-[0_25px_60px_rgba(15,23,42,0.18)] backdrop-blur-2xl ring-1 ring-white/50 md:px-10 md:py-12">
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
                  className="rounded-3xl bg-white/80 px-6 py-5 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur md:px-8 md:py-6"
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

        <section id="schedule" className="bg-white/85 backdrop-blur">
          <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.5em] text-ember">
                  Day by day
                </p>
                <h2 className="font-display text-3xl uppercase tracking-[0.1em] md:text-4xl">
                  7-Day Training Journey
                </h2>
                <p className="text-sm text-stone md:text-base">
                  Every day mixes skill sessions, competitive reps, and film
                  study. You will leave with a personalized development plan and
                  measurable progress.
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
                    18+ hours
                  </p>
                  <p className="text-xs text-white/70">of coached reps</p>
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
                className="rounded-3xl bg-white/90 px-6 py-5 text-center shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur"
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

        <section className="bg-mist/85 backdrop-blur">
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
                  className="group overflow-hidden rounded-3xl bg-white/90 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur"
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
          <div className="rounded-[36px] bg-white/55 px-6 py-8 shadow-[0_25px_60px_rgba(15,23,42,0.18)] backdrop-blur-2xl ring-1 ring-white/50 md:px-10 md:py-12">
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
                <div className="rounded-3xl bg-white/80 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur">
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
                    className="flex items-center gap-5 rounded-3xl bg-white/80 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur"
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

        <section className="bg-white/85 backdrop-blur">
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
                  className="rounded-3xl bg-sand/90 p-8 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur"
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
                Submit the form and our team will confirm placement, payment
                options, and daily logistics.
              </p>
              <div className="rounded-3xl border border-white/20 bg-white/10 p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-citrus">
                  Camp Package
                </p>
                <p className="mt-3 text-3xl font-display uppercase tracking-[0.08em]">
                  ₦800,000.00
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
            <p className="text-white/70">
              7-day immersive training for athletes ready to compete at the next
              level.
            </p>
          </div>
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-citrus">
              Contact
            </p>
            <p className="text-white/70">ballarkafrica@gmail.com</p>
            <p className="text-white/70">09067831477</p>
          </div>
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-citrus">
              Location
            </p>
            <p className="text-white/70">1234 Beverlywoods Way</p>
            <p className="text-white/70">Los Angeles, CA 90035</p>
          </div>
        </div>
      </footer>
    </div>
  );
}





