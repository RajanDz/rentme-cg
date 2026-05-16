export const config = {
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+382XXXXXXXX',
  whatsappLink: () => `https://wa.me/${config.whatsappNumber.replace(/\D/g, '')}`,
  instagramHandle: process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || 'rentme.cg',
  instagramLink: () => `https://instagram.com/${config.instagramHandle}`,
  mail: process.env.NEXT_PUBLIC_CONTACT_MAIL || 'hello@rentme.cg',
}
