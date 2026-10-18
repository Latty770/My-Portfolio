import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Linking,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { getPortfolio, sendMessage } from './src/api';

const INTERESTS = [
  'Z Crew App',
  'Z Booking',
  'Parcel Shop',
  'Z Management Hub',
  'Z REST POS',
  'Zerion ERP',
  'Custom software',
  'General enquiry',
];

const initialForm = {
  name: '',
  email: '',
  organisation: '',
  interest: 'Z Crew App',
  message: '',
};

export default function App() {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getPortfolio()
      .then(setPortfolio)
      .catch(() => {
        Alert.alert(
          'API unavailable',
          'Could not reach the Express backend. Start the server and set EXPO_PUBLIC_API_URL if needed.',
        );
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit() {
    setSubmitting(true);
    try {
      const result = await sendMessage(form);
      Alert.alert('Message sent', result.message);
      setForm(initialForm);
    } catch (error) {
      Alert.alert('Could not send', error.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <StatusBar barStyle="dark-content" />
        <ActivityIndicator size="large" color="#c81e4a" />
      </SafeAreaView>
    );
  }

  const profile = portfolio?.profile || {};
  const about = Array.isArray(profile.about) ? profile.about : [profile.about].filter(Boolean);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.kicker}>
          {profile.companyRole || 'Proprietor · Full-Stack Software Engineer · Product Manager'}
        </Text>
        <Text style={styles.logo}>{profile.name || 'Reagan Munene'}</Text>
        <Text style={styles.tagline}>{profile.tagline}</Text>
        <Text style={styles.body}>
          Founder of {profile.company || 'ZERION TECH SYSTEMS'} — booking, logistics, POS, and ERP for SACCOs and businesses.
        </Text>
        {profile.companyUrl ? (
          <TouchableOpacity onPress={() => Linking.openURL(profile.companyUrl)}>
            <Text style={[styles.link, styles.gap]}>Visit Zerion website →</Text>
          </TouchableOpacity>
        ) : null}

        <Text style={styles.section}>About</Text>
        {about.map((paragraph) => (
          <Text key={paragraph.slice(0, 24)} style={[styles.body, styles.gap]}>
            {paragraph}
          </Text>
        ))}

        <Text style={styles.section}>Experience</Text>
        {(portfolio?.experience || []).map((job) => (
          <View key={`${job.org}-${job.role}`} style={styles.block}>
            <Text style={styles.period}>{job.period}</Text>
            <Text style={styles.cardTitle}>{job.role}</Text>
            <Text style={styles.org}>{job.org}</Text>
            <Text style={styles.body}>{job.summary}</Text>
          </View>
        ))}

        <Text style={styles.section}>Selected work</Text>
        {(portfolio?.projects || []).map((project) => (
          <View key={project.title} style={styles.block}>
            <Text style={styles.period}>{project.kind}</Text>
            <Text style={styles.cardTitle}>{project.title}</Text>
            <Text style={styles.body}>{project.description}</Text>
            <Text style={styles.stack}>{(project.stack || []).join(' · ')}</Text>
          </View>
        ))}

        <Text style={styles.section}>Skills</Text>
        {(portfolio?.skills || []).map((group) => (
          <View key={group.group} style={styles.block}>
            <Text style={styles.cardTitle}>{group.group}</Text>
            <Text style={styles.body}>{(group.items || []).join(' · ')}</Text>
          </View>
        ))}

        <Text style={styles.section}>Reach me</Text>
        <Text style={[styles.body, styles.gap]}>
          Same Zerion enquiry inbox as the company website contact form.
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Full name"
          placeholderTextColor="#6d5e52"
          value={form.name}
          onChangeText={(name) => setForm((current) => ({ ...current, name }))}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#6d5e52"
          keyboardType="email-address"
          autoCapitalize="none"
          value={form.email}
          onChangeText={(email) => setForm((current) => ({ ...current, email }))}
        />
        <TextInput
          style={styles.input}
          placeholder="Organisation"
          placeholderTextColor="#6d5e52"
          value={form.organisation}
          onChangeText={(organisation) => setForm((current) => ({ ...current, organisation }))}
        />
        <View style={styles.interestWrap}>
          {INTERESTS.map((item) => (
            <TouchableOpacity
              key={item}
              style={[styles.interestChip, form.interest === item && styles.interestChipActive]}
              onPress={() => setForm((current) => ({ ...current, interest: item }))}
            >
              <Text
                style={[
                  styles.interestText,
                  form.interest === item && styles.interestTextActive,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TextInput
          style={[styles.input, styles.textarea]}
          placeholder="Message"
          placeholderTextColor="#6d5e52"
          multiline
          value={form.message}
          onChangeText={(message) => setForm((current) => ({ ...current, message }))}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={submitting}>
          <Text style={styles.buttonText}>{submitting ? 'Sending…' : 'Send enquiry'}</Text>
        </TouchableOpacity>

        <View style={styles.links}>
          <TouchableOpacity onPress={() => Linking.openURL('mailto:zeriontechsys@gmail.com')}>
            <Text style={styles.link}>Zerion email</Text>
          </TouchableOpacity>
          {profile.github ? (
            <TouchableOpacity onPress={() => Linking.openURL(profile.github)}>
              <Text style={styles.link}>GitHub</Text>
            </TouchableOpacity>
          ) : null}
          {profile.linkedin ? (
            <TouchableOpacity onPress={() => Linking.openURL(profile.linkedin)}>
              <Text style={styles.link}>LinkedIn</Text>
            </TouchableOpacity>
          ) : null}
        </View>
        {profile.github ? (
          <TouchableOpacity onPress={() => Linking.openURL(profile.github)}>
            <Text style={[styles.body, styles.gap]}>{profile.github}</Text>
          </TouchableOpacity>
        ) : null}
        {profile.linkedin ? (
          <TouchableOpacity onPress={() => Linking.openURL(profile.linkedin)}>
            <Text style={styles.body}>{profile.linkedin}</Text>
          </TouchableOpacity>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f0f2f4',
  },
  centered: {
    flex: 1,
    backgroundColor: '#f0f2f4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 24,
    paddingBottom: 48,
  },
  kicker: {
    color: '#c81e4a',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  logo: {
    color: '#0a0a0a',
    fontSize: 36,
    fontWeight: '800',
    marginBottom: 10,
  },
  tagline: {
    color: '#222',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  section: {
    color: '#0a0a0a',
    fontSize: 24,
    fontWeight: '700',
    marginTop: 28,
    marginBottom: 14,
  },
  body: {
    color: '#5c5c5c',
    fontSize: 15,
    lineHeight: 22,
  },
  gap: {
    marginBottom: 10,
  },
  block: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(10, 10, 10, 0.14)',
    paddingBottom: 14,
    marginBottom: 14,
  },
  period: {
    color: '#c81e4a',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  cardTitle: {
    color: '#0a0a0a',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4,
  },
  org: {
    color: '#5c5c5c',
    marginBottom: 6,
  },
  stack: {
    color: '#0a0a0a',
    marginTop: 8,
    fontSize: 13,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#f7f8f9',
    borderColor: 'rgba(10, 10, 10, 0.14)',
    borderWidth: 1,
    borderRadius: 0,
    color: '#0a0a0a',
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
  },
  textarea: {
    minHeight: 110,
    textAlignVertical: 'top',
  },
  interestWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  interestChip: {
    borderWidth: 1,
    borderColor: 'rgba(10, 10, 10, 0.14)',
    borderRadius: 0,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#f7f8f9',
  },
  interestChipActive: {
    backgroundColor: '#0a0a0a',
    borderColor: '#0a0a0a',
  },
  interestText: {
    color: '#222',
    fontSize: 12,
    fontWeight: '600',
  },
  interestTextActive: {
    color: '#f7f8f9',
  },
  button: {
    backgroundColor: '#0a0a0a',
    borderRadius: 0,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#f7f8f9',
    fontWeight: '700',
    fontSize: 16,
  },
  links: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: 12,
  },
  link: {
    color: '#9f1639',
    fontSize: 16,
    fontWeight: '600',
  },
});
