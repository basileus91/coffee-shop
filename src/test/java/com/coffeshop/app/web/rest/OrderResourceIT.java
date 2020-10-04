//package com.coffeshop.app.web.rest;
//
//import com.coffeshop.app.CoffeshopApp;
//import com.coffeshop.app.domain.Order;
//import com.coffeshop.app.repository.OrderRepository;
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
//import org.springframework.validation.Validator;
//
//import javax.persistence.EntityManager;
//import java.time.Instant;
//import java.time.temporal.ChronoUnit;
//import java.util.List;
//
//import static com.coffeshop.app.web.rest.TestUtil.createFormattingConversionService;
//import static org.assertj.core.api.Assertions.assertThat;
//import static org.hamcrest.Matchers.hasItem;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
//
///**
// * Integration tests for the {@Link OrderResource} REST controller.
// */
//@SpringBootTest(classes = CoffeshopApp.class)
//public class OrderResourceIT {
//
//    private static final String DEFAULT_COMMAND_ID = "AAAAAAAAAA";
//    private static final String UPDATED_COMMAND_ID = "BBBBBBBBBB";
//
//    private static final Boolean DEFAULT_PAYMENT_METHOD = false;
//    private static final Boolean UPDATED_PAYMENT_METHOD = true;
//
//    private static final String DEFAULT_ABOUT_US = "AAAAAAAAAA";
//    private static final String UPDATED_ABOUT_US = "BBBBBBBBBB";
//
//    private static final String DEFAULT_RECOMMANDATION = "AAAAAAAAAA";
//    private static final String UPDATED_RECOMMANDATION = "BBBBBBBBBB";
//
//    private static final String DEFAULT_SOCIAL_MEDIA = "AAAAAAAAAA";
//    private static final String UPDATED_SOCIAL_MEDIA = "BBBBBBBBBB";
//
//    private static final Instant DEFAULT_ORDER_DATE = Instant.ofEpochMilli(0L);
//    private static final Instant UPDATED_ORDER_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);
//
//    @Autowired
//    private OrderRepository orderRepository;
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
//    private MockMvc restOrderMockMvc;
//
//    private Order order;
//
//    @BeforeEach
//    public void setup() {
//        MockitoAnnotations.initMocks(this);
//        final OrderResource orderResource = new OrderResource(orderRepository);
//        this.restOrderMockMvc = MockMvcBuilders.standaloneSetup(orderResource)
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
//    public static Order createEntity(EntityManager em) {
//        Order order = new Order()
//            .commandId(DEFAULT_COMMAND_ID)
//            .paymentMethod(DEFAULT_PAYMENT_METHOD)
//            .aboutUs(DEFAULT_ABOUT_US)
//            .recommandation(DEFAULT_RECOMMANDATION)
//            .socialMedia(DEFAULT_SOCIAL_MEDIA)
//            .orderDate(DEFAULT_ORDER_DATE);
//        return order;
//    }
//    /**
//     * Create an updated entity for this test.
//     *
//     * This is a static method, as tests for other entities might also need it,
//     * if they test an entity which requires the current entity.
//     */
//    public static Order createUpdatedEntity(EntityManager em) {
//        Order order = new Order()
//            .commandId(UPDATED_COMMAND_ID)
//            .paymentMethod(UPDATED_PAYMENT_METHOD)
//            .aboutUs(UPDATED_ABOUT_US)
//            .recommandation(UPDATED_RECOMMANDATION)
//            .socialMedia(UPDATED_SOCIAL_MEDIA)
//            .orderDate(UPDATED_ORDER_DATE);
//        return order;
//    }
//
//    @BeforeEach
//    public void initTest() {
//        order = createEntity(em);
//    }
//
//    @Test
//    @Transactional
//    public void createOrder() throws Exception {
//        int databaseSizeBeforeCreate = orderRepository.findAll().size();
//
//        // Create the Order
//        restOrderMockMvc.perform(post("/api/orders")
//            .contentType(TestUtil.APPLICATION_JSON_UTF8)
//            .content(TestUtil.convertObjectToJsonBytes(order)))
//            .andExpect(status().isCreated());
//
//        // Validate the Order in the database
//        List<Order> orderList = orderRepository.findAll();
//        assertThat(orderList).hasSize(databaseSizeBeforeCreate + 1);
//        Order testOrder = orderList.get(orderList.size() - 1);
//        assertThat(testOrder.getCommandId()).isEqualTo(DEFAULT_COMMAND_ID);
//        assertThat(testOrder.isPaymentMethod()).isEqualTo(DEFAULT_PAYMENT_METHOD);
//        assertThat(testOrder.getAboutUs()).isEqualTo(DEFAULT_ABOUT_US);
//        assertThat(testOrder.getRecommandation()).isEqualTo(DEFAULT_RECOMMANDATION);
//        assertThat(testOrder.getSocialMedia()).isEqualTo(DEFAULT_SOCIAL_MEDIA);
//        assertThat(testOrder.getOrderDate()).isEqualTo(DEFAULT_ORDER_DATE);
//    }
//
//    @Test
//    @Transactional
//    public void createOrderWithExistingId() throws Exception {
//        int databaseSizeBeforeCreate = orderRepository.findAll().size();
//
//        // Create the Order with an existing ID
//        order.setId(1L);
//
//        // An entity with an existing ID cannot be created, so this API call must fail
//        restOrderMockMvc.perform(post("/api/orders")
//            .contentType(TestUtil.APPLICATION_JSON_UTF8)
//            .content(TestUtil.convertObjectToJsonBytes(order)))
//            .andExpect(status().isBadRequest());
//
//        // Validate the Order in the database
//        List<Order> orderList = orderRepository.findAll();
//        assertThat(orderList).hasSize(databaseSizeBeforeCreate);
//    }
//
//
//    @Test
//    @Transactional
//    public void getAllOrders() throws Exception {
//        // Initialize the database
//        orderRepository.saveAndFlush(order);
//
//        // Get all the orderList
//        restOrderMockMvc.perform(get("/api/orders?sort=id,desc"))
//            .andExpect(status().isOk())
//            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
//            .andExpect(jsonPath("$.[*].id").value(hasItem(order.getId().intValue())))
//            .andExpect(jsonPath("$.[*].commandId").value(hasItem(DEFAULT_COMMAND_ID.toString())))
//            .andExpect(jsonPath("$.[*].paymentMethod").value(hasItem(DEFAULT_PAYMENT_METHOD.booleanValue())))
//            .andExpect(jsonPath("$.[*].aboutUs").value(hasItem(DEFAULT_ABOUT_US.toString())))
//            .andExpect(jsonPath("$.[*].recommandation").value(hasItem(DEFAULT_RECOMMANDATION.toString())))
//            .andExpect(jsonPath("$.[*].socialMedia").value(hasItem(DEFAULT_SOCIAL_MEDIA.toString())))
//            .andExpect(jsonPath("$.[*].orderDate").value(hasItem(DEFAULT_ORDER_DATE.toString())));
//    }
//
//    @Test
//    @Transactional
//    public void getOrder() throws Exception {
//        // Initialize the database
//        orderRepository.saveAndFlush(order);
//
//        // Get the order
//        restOrderMockMvc.perform(get("/api/orders/{id}", order.getId()))
//            .andExpect(status().isOk())
//            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
//            .andExpect(jsonPath("$.id").value(order.getId().intValue()))
//            .andExpect(jsonPath("$.commandId").value(DEFAULT_COMMAND_ID.toString()))
//            .andExpect(jsonPath("$.paymentMethod").value(DEFAULT_PAYMENT_METHOD.booleanValue()))
//            .andExpect(jsonPath("$.aboutUs").value(DEFAULT_ABOUT_US.toString()))
//            .andExpect(jsonPath("$.recommandation").value(DEFAULT_RECOMMANDATION.toString()))
//            .andExpect(jsonPath("$.socialMedia").value(DEFAULT_SOCIAL_MEDIA.toString()))
//            .andExpect(jsonPath("$.orderDate").value(DEFAULT_ORDER_DATE.toString()));
//    }
//
//    @Test
//    @Transactional
//    public void getNonExistingOrder() throws Exception {
//        // Get the order
//        restOrderMockMvc.perform(get("/api/orders/{id}", Long.MAX_VALUE))
//            .andExpect(status().isNotFound());
//    }
//
//    @Test
//    @Transactional
//    public void updateOrder() throws Exception {
//        // Initialize the database
//        orderRepository.saveAndFlush(order);
//
//        int databaseSizeBeforeUpdate = orderRepository.findAll().size();
//
//        // Update the order
//        Order updatedOrder = orderRepository.findById(order.getId()).get();
//        // Disconnect from session so that the updates on updatedOrder are not directly saved in db
//        em.detach(updatedOrder);
//        updatedOrder
//            .commandId(UPDATED_COMMAND_ID)
//            .paymentMethod(UPDATED_PAYMENT_METHOD)
//            .aboutUs(UPDATED_ABOUT_US)
//            .recommandation(UPDATED_RECOMMANDATION)
//            .socialMedia(UPDATED_SOCIAL_MEDIA)
//            .orderDate(UPDATED_ORDER_DATE);
//
//        restOrderMockMvc.perform(put("/api/orders")
//            .contentType(TestUtil.APPLICATION_JSON_UTF8)
//            .content(TestUtil.convertObjectToJsonBytes(updatedOrder)))
//            .andExpect(status().isOk());
//
//        // Validate the Order in the database
//        List<Order> orderList = orderRepository.findAll();
//        assertThat(orderList).hasSize(databaseSizeBeforeUpdate);
//        Order testOrder = orderList.get(orderList.size() - 1);
//        assertThat(testOrder.getCommandId()).isEqualTo(UPDATED_COMMAND_ID);
//        assertThat(testOrder.isPaymentMethod()).isEqualTo(UPDATED_PAYMENT_METHOD);
//        assertThat(testOrder.getAboutUs()).isEqualTo(UPDATED_ABOUT_US);
//        assertThat(testOrder.getRecommandation()).isEqualTo(UPDATED_RECOMMANDATION);
//        assertThat(testOrder.getSocialMedia()).isEqualTo(UPDATED_SOCIAL_MEDIA);
//        assertThat(testOrder.getOrderDate()).isEqualTo(UPDATED_ORDER_DATE);
//    }
//
//    @Test
//    @Transactional
//    public void updateNonExistingOrder() throws Exception {
//        int databaseSizeBeforeUpdate = orderRepository.findAll().size();
//
//        // Create the Order
//
//        // If the entity doesn't have an ID, it will throw BadRequestAlertException
//        restOrderMockMvc.perform(put("/api/orders")
//            .contentType(TestUtil.APPLICATION_JSON_UTF8)
//            .content(TestUtil.convertObjectToJsonBytes(order)))
//            .andExpect(status().isBadRequest());
//
//        // Validate the Order in the database
//        List<Order> orderList = orderRepository.findAll();
//        assertThat(orderList).hasSize(databaseSizeBeforeUpdate);
//    }
//
//    @Test
//    @Transactional
//    public void deleteOrder() throws Exception {
//        // Initialize the database
//        orderRepository.saveAndFlush(order);
//
//        int databaseSizeBeforeDelete = orderRepository.findAll().size();
//
//        // Delete the order
//        restOrderMockMvc.perform(delete("/api/orders/{id}", order.getId())
//            .accept(TestUtil.APPLICATION_JSON_UTF8))
//            .andExpect(status().isNoContent());
//
//        // Validate the database contains one less item
//        List<Order> orderList = orderRepository.findAll();
//        assertThat(orderList).hasSize(databaseSizeBeforeDelete - 1);
//    }
//
//    @Test
//    @Transactional
//    public void equalsVerifier() throws Exception {
//        TestUtil.equalsVerifier(Order.class);
//        Order order1 = new Order();
//        order1.setId(1L);
//        Order order2 = new Order();
//        order2.setId(order1.getId());
//        assertThat(order1).isEqualTo(order2);
//        order2.setId(2L);
//        assertThat(order1).isNotEqualTo(order2);
//        order1.setId(null);
//        assertThat(order1).isNotEqualTo(order2);
//    }
//}
