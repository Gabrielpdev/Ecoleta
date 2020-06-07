import React ,{useState, useEffect} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { Feather as Icon } from '@expo/vector-icons';
import { View, ImageBackground, Image,Text, StyleSheet } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';

interface IBGEUFResponse{
  sigla: string
}

interface IBGECityResponse{
  nome: string
}

const Home = () => {
  const navigation = useNavigation();

  const [ufs, setUfs] = useState<string[]>([]);
  const [selectedUf, setselectedUf] = useState('0');
  const [citys, setCitys] = useState<string[]>([]);
  const [selectedCity, setselectedCity] = useState('0');

  useEffect(() => {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then((response) => {
        const ufInitials = response.data.map((uf) => uf.sigla);

        setUfs(ufInitials);
      });
  }, []);

  useEffect(() => {
    axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
      .then((response) => {
        const cityName = response.data.map((city) => city.nome);

        setCitys(cityName);
      });
  }, [selectedUf]);

  function handleNavigation(){
    navigation.navigate('Points', {
      uf: selectedUf,
      city: selectedCity
    })
  }


  return(
    <ImageBackground 
    source={require('../../assets/home-background.png')} 
    style={styles.container}
    imageStyle={{height: 368, width:274 }}
    >
      <View style={styles.main}>
        <Image source={require('../../assets/logo.png')} />
        <Text style={styles.title}> Seu marketplace de coleta de resíduos</Text>
        <Text style={styles.description}> Ajudamos pessoas a encontrarem pontos de coleta eficiente</Text>
      </View>

      <View style={styles.footer} > 
      <RNPickerSelect
        placeholder={{ label: 'Selecione uma UF', value:null}}
        onValueChange={(value) => setselectedUf(value)}
        items={ufs.map( uf => (
          { label: String(uf), value:String(uf), key:String(uf)}
        ))}
      />
      <RNPickerSelect
        placeholder={{ label: 'Selecione uma cidade', value:null}}
        onValueChange={(value) => setselectedCity(value)}
        items={citys.map( city => ( 
          { label: String(city), value:String(city), key:String(city)}
        ))}
      />
        <RectButton style={styles.button} onPress={handleNavigation}>
          <View style={styles.buttonIcon}>
            <Text>
              <Icon name='arrow-right'color='#fff'sixe={24} />
            </Text>
          </View>
          <Text style={styles.buttonText}>
            Entrar
          </Text>
        </RectButton>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});

export default Home;