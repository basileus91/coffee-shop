//package com.coffeshop.app.web.rest;
//
//import com.coffeshop.app.CoffeshopApp;
//import com.coffeshop.app.domain.Coffe;
//import com.coffeshop.app.repository.CoffeRepository;
//import com.coffeshop.app.web.rest.errors.ExceptionTranslator;
//
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.MockitoAnnotations;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
//import org.springframework.http.MediaType;
//import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.setup.MockMvcBuilders;
//import org.springframework.transaction.annotation.Transactional;
//import org.springframework.util.Base64Utils;
//import org.springframework.validation.Validator;
//
//import javax.persistence.EntityManager;
//import java.util.List;
//
//import static com.coffeshop.app.web.rest.TestUtil.createFormattingConversionService;
//import static org.assertj.core.api.Assertions.assertThat;
//import static org.hamcrest.Matchers.hasItem;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
//
///**
// * Integration tests for the {@Link CoffeResource} REST controller.
// */
//@SpringBootTest(classes = CoffeshopApp.class)
//public class CoffeResourceIT {
//
//    private static final String DEFAULT_NAME = "AAAAAAAAAA";
//    private static final String UPDATED_NAME = "BBBBBBBBBB";
//
//    private static final String DEFAULT_COUNTRY_NAME = "AAAAAAAAAA";
//    private static final String UPDATED_COUNTRY_NAME = "BBBBBBBBBB";
//
//    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
//    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";
//
//    private static final Long DEFAULT_QUANTITY = 1L;
//    private static final Long UPDATED_QUANTITY = 2L;
//
//    private static final Double DEFAULT_PRICE = 1D;
//    private static final Double UPDATED_PRICE = 2D;
//
//    private static final byte[] DEFAULT_PHOTO = TestUtil.createByteArray(1, "0");
//    private static final byte[] UPDATED_PHOTO = TestUtil.createByteArray(1, "1");
//    private static final String DEFAULT_PHOTO_CONTENT_TYPE = "image/jpg";
//    private static final String UPDATED_PHOTO_CONTENT_TYPE = "image/png";
//
//    @Autowired
//    private CoffeRepository coffeRepository;
//
//    @Autowired
//    private MappingJackson2HttpMessageConverter jacksonMessageConverter;
//
//    @Autowired
//    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;
//
//    @Autowired
//    private ExceptionTranslator exceptionTranslator;
//
//    @Autowired
//    private EntityManager em;
//
//    @Autowired
//    private Validator validator;
//
//    private MockMvc restCoffeMockMvc;
//
//    private Coffe coffe;
//
//    @BeforeEach
//    public void setup() {
//        MockitoAnnotations.initMocks(this);
//        final CoffeResource coffeResource = new CoffeResource(coffeRepository);
//        this.restCoffeMockMvc = MockMvcBuilders.standaloneSetup(coffeResource)
//            .setCustomArgumentResolvers(pageableArgumentResolver)
//            .setControllerAdvice(exceptionTranslator)
//            .setConversionService(createFormattingConversionService())
//            .setMessageConverters(jacksonMessageConverter)
//            .setValidator(validator).build();
//    }
//
//    /**
//     * Create an entity for this test.
//     *
//     * This is a static method, as tests for other entities might also need it,
//     * if they test an entity which requires the current entity.
//     */
//    public static Coffe createEntity(EntityManager em) {
//        Coffe coffe = new Coffe()
//            .name(DEFAULT_NAME)
//            .countryName(DEFAULT_COUNTRY_NAME)
//            .description(DEFAULT_DESCRIPTION)
//            .quantity(DEFAULT_QUANTITY)
//            .price(DEFAULT_PRICE)
//            .photo(DEFAULT_PHOTO)
//            .photoContentType(DEFAULT_PHOTO_CONTENT_TYPE);
//        return coffe;
//    }
//    /**
//     * Create an updated entity for this test.
//     *
//     * This is a static method, as tests for other entities might also need it,
//     * if they test an entity which requires the current entity.
//     */
//    public static Coffe createUpdatedEntity(EntityManager em) {
//        Coffe coffe = new Coffe()
//            .name(UPDATED_NAME)
//            .countryName(UPDATED_COUNTRY_NAME)
//            .description(UPDATED_DESCRIPTION)
//            .quantity(UPDATED_QUANTITY)
//            .price(UPDATED_PRICE)
//            .photo(UPDATED_PHOTO)
//            .photoContentType(UPDATED_PHOTO_CONTENT_TYPE);
//        return coffe;
//    }
//
//    @BeforeEach
//    public void initTest() {
//        coffe = createEntity(em);
//    }
//
//    @Test
//    @Transactional
//    public void createCoffe() throws Exception {
//        int databaseSizeBeforeCreate = coffeRepository.findAll().size();
//
//        // Create the Coffe
//        restCoffeMockMvc.perform(post("/api/coffes")
//            .contentType(TestUtil.APPLICATION_JSON_UTF8)
//            .content(TestUtil.convertObjectToJsonBytes(coffe)))
//            .andExpect(status().isCreated());
//
//        // Validate the Coffe in the database
//        List<Coffe> coffeList = coffeRepository.findAll();
//        assertThat(coffeList).hasSize(databaseSizeBeforeCreate + 1);
//        Coffe testCoffe = coffeList.get(coffeList.size() - 1);
//        assertThat(testCoffe.getName()).isEqualTo(DEFAULT_NAME);
//        assertThat(testCoffe.getCountryName()).isEqualTo(DEFAULT_COUNTRY_NAME);
//        assertThat(testCoffe.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
//        assertThat(testCoffe.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
//        assertThat(testCoffe.getPrice()).isEqualTo(DEFAULT_PRICE);
//        assertThat(testCoffe.getPhoto()).isEqualTo(DEFAULT_PHOTO);
//        assertThat(testCoffe.getPhotoContentType()).isEqualTo(DEFAULT_PHOTO_CONTENT_TYPE);
//    }
//
//    @Test
//    @Transactional
//    public void createCoffeWithExistingId() throws Exception {
//        int databaseSizeBeforeCreate = coffeRepository.findAll().size();
//
//        // Create the Coffe with an existing ID
//        coffe.setId(1L);
//
//        // An entity with an existing ID cannot be created, so this API call must fail
//        restCoffeMockMvc.perform(post("/api/coffes")
//            .contentType(TestUtil.APPLICATION_JSON_UTF8)
//            .content(TestUtil.convertObjectToJsonBytes(coffe)))
//            .andExpect(status().isBadRequest());
//
//        // Validate the Coffe in the database
//        List<Coffe> coffeList = coffeRepository.findAll();
//        assertThat(coffeList).hasSize(databaseSizeBeforeCreate);
//    }
//
//
//    @Test
//    @Transactional
//    public void getAllCoffes() throws Exception {
//        // Initialize the database
//        coffeRepository.saveAndFlush(coffe);
//
//        // Get all the coffeList
//        restCoffeMockMvc.perform(get("/api/coffes?sort=id,desc"))
//            .andExpect(status().isOk())
//            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
//            .andExpect(jsonPath("$.[*].id").value(hasItem(coffe.getId().intValue())))
//            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
//            .andExpect(jsonPath("$.[*].countryName").value(hasItem(DEFAULT_COUNTRY_NAME.toString())))
//            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
//            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY.intValue())))
//            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.doubleValue())))
//            .andExpect(jsonPath("$.[*].photoContentType").value(hasItem(DEFAULT_PHOTO_CONTENT_TYPE)))
//            .andExpect(jsonPath("$.[*].photo").value(hasItem(Base64Utils.encodeToString(DEFAULT_PHOTO))));
//    }
//
//    @Test
//    @Transactional
//    public void getCoffe() throws Exception {
//        // Initialize the database
//        coffeRepository.saveAndFlush(coffe);
//
//        // Get the coffe
//        restCoffeMockMvc.perform(get("/api/coffes/{id}", coffe.getId()))
//            .andExpect(status().isOk())
//            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
//            .andExpect(jsonPath("$.id").value(coffe.getId().intValue()))
//            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
//            .andExpect(jsonPath("$.countryName").value(DEFAULT_COUNTRY_NAME.toString()))
//            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
//            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY.intValue()))
//            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.doubleValue()))
//            .andExpect(jsonPath("$.photoContentType").value(DEFAULT_PHOTO_CONTENT_TYPE))
//            .andExpect(jsonPath("$.photo").value(Base64Utils.encodeToString(DEFAULT_PHOTO)));
//    }
//
//    @Test
//    @Transactional
//    public void getNonExistingCoffe() throws Exception {
//        // Get the coffe
//        restCoffeMockMvc.perform(get("/api/coffes/{id}", Long.MAX_VALUE))
//            .andExpect(status().isNotFound());
//    }
//
//    @Test
//    @Transactional
//    public void updateCoffe() throws Exception {
//        // Initialize the database
//        coffeRepository.saveAndFlush(coffe);
//
//        int databaseSizeBeforeUpdate = coffeRepository.findAll().size();
//
//        // Update the coffe
//        Coffe updatedCoffe = coffeRepository.findById(coffe.getId()).get();
//        // Disconnect from session so that the updates on updatedCoffe are not directly saved in db
//        em.detach(updatedCoffe);
//        updatedCoffe
//            .name(UPDATED_NAME)
//            .countryName(UPDATED_COUNTRY_NAME)
//            .description(UPDATED_DESCRIPTION)
//            .quantity(UPDATED_QUANTITY)
//            .price(UPDATED_PRICE)
//            .photo(UPDATED_PHOTO)
//            .photoContentType(UPDATED_PHOTO_CONTENT_TYPE);
//
//        restCoffeMockMvc.perform(put("/api/coffes")
//            .contentType(TestUtil.APPLICATION_JSON_UTF8)
//            .content(TestUtil.convertObjectToJsonBytes(updatedCoffe)))
//            .andExpect(status().isOk());
//
//        // Validate the Coffe in the database
//        List<Coffe> coffeList = coffeRepository.findAll();
//        assertThat(coffeList).hasSize(databaseSizeBeforeUpdate);
//        Coffe testCoffe = coffeList.get(coffeList.size() - 1);
//        assertThat(testCoffe.getName()).isEqualTo(UPDATED_NAME);
//        assertThat(testCoffe.getCountryName()).isEqualTo(UPDATED_COUNTRY_NAME);
//        assertThat(testCoffe.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
//        assertThat(testCoffe.getQuantity()).isEqualTo(UPDATED_QUANTITY);
//        assertThat(testCoffe.getPrice()).isEqualTo(UPDATED_PRICE);
//        assertThat(testCoffe.getPhoto()).isEqualTo(UPDATED_PHOTO);
//        assertThat(testCoffe.getPhotoContentType()).isEqualTo(UPDATED_PHOTO_CONTENT_TYPE);
//    }
//
//    @Test
//    @Transactional
//    public void updateNonExistingCoffe() throws Exception {
//        int databaseSizeBeforeUpdate = coffeRepository.findAll().size();
//
//        // Create the Coffe
//
//        // If the entity doesn't have an ID, it will throw BadRequestAlertException
//        restCoffeMockMvc.perform(put("/api/coffes")
//            .contentType(TestUtil.APPLICATION_JSON_UTF8)
//            .content(TestUtil.convertObjectToJsonBytes(coffe)))
//            .andExpect(status().isBadRequest());
//
//        // Validate the Coffe in the database
//        List<Coffe> coffeList = coffeRepository.findAll();
//        assertThat(coffeList).hasSize(databaseSizeBeforeUpdate);
//    }
//
//    @Test
//    @Transactional
//    public void deleteCoffe() throws Exception {
//        // Initialize the database
//        coffeRepository.saveAndFlush(coffe);
//
//        int databaseSizeBeforeDelete = coffeRepository.findAll().size();
//
//        // Delete the coffe
//        restCoffeMockMvc.perform(delete("/api/coffes/{id}", coffe.getId())
//            .accept(TestUtil.APPLICATION_JSON_UTF8))
//            .andExpect(status().isNoContent());
//
//        // Validate the database contains one less item
//        List<Coffe> coffeList = coffeRepository.findAll();
//        assertThat(coffeList).hasSize(databaseSizeBeforeDelete - 1);
//    }
//
//    @Test
//    @Transactional
//    public void equalsVerifier() throws Exception {
//        TestUtil.equalsVerifier(Coffe.class);
//        Coffe coffe1 = new Coffe();
//        coffe1.setId(1L);
//        Coffe coffe2 = new Coffe();
//        coffe2.setId(coffe1.getId());
//        assertThat(coffe1).isEqualTo(coffe2);
//        coffe2.setId(2L);
//        assertThat(coffe1).isNotEqualTo(coffe2);
//        coffe1.setId(null);
//        assertThat(coffe1).isNotEqualTo(coffe2);
//    }
//}
