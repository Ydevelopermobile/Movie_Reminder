import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView,Image,Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importa el ícono que desees utilizar

const AboutScreen = () => {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (sectionId) => {
    setActiveSection(sectionId === activeSection ? null : sectionId);
  };
  const localImage = require('../assets/logo.jpg');

  const renderAccordionItem = (sectionId, title, content) => {
    const isActive = sectionId === activeSection;

    return (
      <View style={styles.accordionItem} key={sectionId}>
        <TouchableOpacity
          style={styles.accordionHeader}
          onPress={() => toggleSection(sectionId)}
        >
          <Text style={styles.headerText}>
            {title}{' '}
            <Icon name={isActive ? 'chevron-up' : 'chevron-down'} size={16} /> {/* Añade el ícono */}
          </Text>
        </TouchableOpacity>
        {isActive && (
        <View style={styles.accordionContent}>
          {sectionId === 'section1' && (
    
            <View>
              <Text>{content}</Text>
              <Text style={styles.privacyPolicy}>
                <Text style={styles.txttitulo}> Condiciones de uso:</Text>
                {"\n\n"}
                Al utilizar esta aplicación, aceptas cumplir con los siguientes términos y condiciones:
                {"\n\n"}
                Uso Apropiado: La aplicación está destinada únicamente para uso personal y no comercial. No está permitido el uso indebido, la copia no autorizada o la distribución de contenido sin permiso.
                {"\n\n"}
                Responsabilidad: El uso de la aplicación es bajo tu propia responsabilidad. No nos hacemos responsables por el mal uso de la información proporcionada por la aplicación.
                {"\n\n"}
                Privacidad: Respetamos tu privacidad. Consulta nuestra política de privacidad para comprender cómo se recopila, utiliza y protege tu información personal.
                {"\n\n"}
                Actualizaciones: La aplicación puede ser actualizada periódicamente para mejorar la funcionalidad y la experiencia del usuario.
                {"\n\n\n"}
                <Text style={styles.txttitulo}> Servicios:</Text>
                {"\n"}
                Nuestra aplicación ofrece los siguientes servicios:
                {"\n\n"}
                Acceso a la Base de Datos: Proporcionamos acceso a la base de datos de The Movie Database (TMDb) para obtener información precisa sobre películas, programas de televisión, actores, reseñas y más.
                {"\n\n"}
                Funcionalidades Específicas: La aplicación puede ofrecer características específicas como búsqueda avanzada, listas personalizadas, reseñas de usuarios, etc.
                {"\n\n"}
                Soporte al Cliente: Ofrecemos asistencia al cliente para resolver problemas técnicos y responder preguntas relacionadas con el uso de la aplicación.
              </Text>
            </View>
          )}
          {sectionId === 'section2' && (
            <View>
              <Text>{content}</Text>
              <TouchableOpacity onPress={() => Linking.openURL('https://moviereminder.netlify.app/')}>
                <Text style={styles.link}>Ver nuestra política de privacidad</Text>
              </TouchableOpacity>
            </View>
          )}
          {sectionId === 'section3' && (
           <View>
              <Text>{content}</Text>
              <Image
                source={localImage} // Usa la imagen importada como origen
                style={styles.tmdbLogo}
              />
            </View>
            
          )}
          {sectionId === 'section4' && (
            <View>
              <Text>{content}</Text>
              <Text style={styles.developer}>Equipo de Desarrollo</Text>
              <Text style={styles.developer}>  * Abraham Rueda Mendez</Text>
                <Text style={styles.developer}>  * John Beimar Cruz Montaño</Text>
                <Text style={styles.developer}>  * Diego Alexander Arroyo Noe</Text>
              </View>
          )}
          </View>
          )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {renderAccordionItem(
          'section1',
          'Condiciones de Uso y Servicio',
          ''
        )}
        {renderAccordionItem(
          'section2',
          'Politica de Privacidad',
          '"Nuestra aplicación respeta tu privacidad. Encuentra detalles sobre cómo protegemos tus datos en nuestro enlace de política de privacidad."'
        )}
        {renderAccordionItem(
          'section3',
          'Partners',
          'Esta aplicación se ha creado utilizando la potente API de The Movie Database (TMDb), permitiendo así ofrecer una experiencia de usuario excepcional y actualizada con información fiable sobre películas y programas de televisión. '
        )}
        {renderAccordionItem(
          'section4',
          'Desarrolladores',
          'Esta aplicación fue desarrollada por estudiantes de la UPDS hemos trabajado arduamente para dar vida a nuestra aplicación. Nuestras habilidades y dedicación han sido fundamentales en cada etapa del proceso de desarrollo:'
        )}
      </ScrollView>
      {/* Footer */}
      <View style={styles.footer}>
        <Text>@2023 Movie Reminder</Text>
        <Text>version 1.0</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between', // Distribuye el contenido verticalmente
  },
  accordionItem: {
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  accordionHeader: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  accordionContent: {
    padding: 10,
  },
  developer: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  tmdbLogo: {
    width: 100, // ajusta el ancho según sea necesario
    height: 100, // ajusta la altura según sea necesario
    resizeMode: 'contain', // para ajustar la imagen dentro del tamaño especificado
    alignSelf: 'center', // para alinear la imagen al centro
    marginVertical: 10, // margen vertical
  },
  
  privacyPolicy: {
    marginTop: 0,
  },
  txttitulo: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});

export default AboutScreen;
