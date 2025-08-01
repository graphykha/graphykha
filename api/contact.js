import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, company, project_type, budget, timeline, message } = req.body;

    // Validation des champs requis
    if (!name || !email || !project_type || !message) {
      return res.status(400).json({ error: 'Champs requis manquants' });
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Email invalide' });
    }

    // Préparation du contenu de l'email
    const emailContent = `
      <h2>Nouvelle demande de contact - Graphykha</h2>
      
      <h3>Informations du client :</h3>
      <p><strong>Nom :</strong> ${name}</p>
      <p><strong>Email :</strong> ${email}</p>
      ${phone ? `<p><strong>Téléphone :</strong> ${phone}</p>` : ''}
      ${company ? `<p><strong>Entreprise :</strong> ${company}</p>` : ''}
      
      <h3>Détails du projet :</h3>
      <p><strong>Type de projet :</strong> ${project_type}</p>
      ${budget ? `<p><strong>Budget :</strong> ${budget}</p>` : ''}
      ${timeline ? `<p><strong>Délai souhaité :</strong> ${timeline}</p>` : ''}
      
      <h3>Description du projet :</h3>
      <p>${message.replace(/\n/g, '<br>')}</p>
      
      <hr>
      <p><em>Email envoyé depuis le formulaire de contact de graphykha.fr</em></p>
    `;

    // Envoi de l'email
    const { data, error } = await resend.emails.send({
      from: 'Graphykha <contact@graphykha.fr>',
      to: ['contact@graphykha.fr'],
      subject: `Nouvelle demande de contact - ${name}`,
      html: emailContent,
      reply_to: email,
    });

    if (error) {
      console.error('Erreur Resend:', error);
      return res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email' });
    }

    // Email de confirmation au client
    const confirmationContent = `
      <h2>Merci pour votre message !</h2>
      
      <p>Bonjour ${name},</p>
      
      <p>Nous avons bien reçu votre demande de contact concernant votre projet de ${project_type}.</p>
      
      <p>Notre équipe va l'étudier avec attention et vous recontactera dans les plus brefs délais.</p>
      
      <h3>Récapitulatif de votre demande :</h3>
      <p><strong>Type de projet :</strong> ${project_type}</p>
      ${budget ? `<p><strong>Budget :</strong> ${budget}</p>` : ''}
      ${timeline ? `<p><strong>Délai souhaité :</strong> ${timeline}</p>` : ''}
      
      <p>En attendant, n'hésitez pas à consulter notre portfolio pour découvrir nos réalisations.</p>
      
      <p>Cordialement,<br>
      <strong>Graphykha</strong><br>
      Graphiste freelance</p>
      
      <hr>
      <p><small>Cet email a été envoyé automatiquement depuis graphykha.fr</small></p>
    `;

    await resend.emails.send({
      from: 'Graphykha <contact@graphykha.fr>',
      to: [email],
      subject: 'Confirmation de votre demande - Graphykha',
      html: confirmationContent,
    });

    return res.status(200).json({ success: true, message: 'Email envoyé avec succès' });

  } catch (error) {
    console.error('Erreur serveur:', error);
    return res.status(500).json({ error: 'Erreur interne du serveur' });
  }
} 