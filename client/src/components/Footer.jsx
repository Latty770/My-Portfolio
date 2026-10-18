export default function Footer({ profile }) {
  return (
    <footer>
      <div className="container footer-inner">
        <p>&copy; {new Date().getFullYear()} {profile?.fullName || 'Reagan Munene Mwiti'}</p>
        <div className="footer-links">
          {profile?.github ? (
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          ) : null}
          {profile?.linkedin ? (
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          ) : null}
          {profile?.companyUrl ? (
            <a href={profile.companyUrl} target="_blank" rel="noreferrer">
              {profile?.company || 'ZERION TECH SYSTEMS'}
            </a>
          ) : (
            <p>{profile?.company || 'ZERION TECH SYSTEMS'}</p>
          )}
        </div>
      </div>
    </footer>
  );
}
