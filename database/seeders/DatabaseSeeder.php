<?php

namespace Database\Seeders;

use App\Models\Business;
use App\Models\CompletedLoyaltyCard;
use App\Models\Customer;
use App\Models\LoyaltyCard;
use App\Models\Perk;
use App\Models\PerkClaim;
use App\Models\StampCode;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Carbon\Carbon;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create Business User
        $user = User::create([
            'username' => 'business_owner',
            'email' => 'business@gmail.com',
            'password' => Hash::make('password'),
            'role' => 'business',
            'email_verified_at' => now(),
        ]);

        // Create Business
        $business = Business::create([
            'user_id' => $user->id,
            'name' => 'Demo Coffee Shop',
            'address' => '123 Main Street, Downtown City',
            'contact_email' => 'contact@democoffee.com',
            'contact_phone' => '+1234567890',
        ]);

        // Create 2 Loyalty Cards for the Business
        $loyaltyCard1 = LoyaltyCard::create([
            'business_id' => $business->id,
            'name' => 'Coffee Lover Card',
            'heading' => 'Free Coffee After 10 Stamps',
            'subheading' => 'Collect stamps and enjoy rewards!',
            'stampsNeeded' => 10,
            'mechanics' => 'Buy any coffee and get 1 stamp. Collect 10 stamps to get a free coffee of your choice.',
            'backgroundColor' => '#6F4E37',
            'textColor' => '#FFFFFF',
            'stampColor' => '#D2691E',
            'stampFilledColor' => '#8B4513',
            'stampEmptyColor' => '#DEB887',
            'stampShape' => 'circle',
            'footer' => 'Thank you for your loyalty!',
            'valid_until' => Carbon::now()->addMonths(6),
        ]);

        $loyaltyCard2 = LoyaltyCard::create([
            'business_id' => $business->id,
            'name' => 'Pastry Paradise',
            'heading' => 'Sweet Rewards Program',
            'subheading' => 'Every pastry brings you closer to free treats!',
            'stampsNeeded' => 8,
            'mechanics' => 'Purchase any pastry to earn stamps. Complete your card for a free dessert!',
            'backgroundColor' => '#FFB6C1',
            'textColor' => '#8B008B',
            'stampColor' => '#FF69B4',
            'stampFilledColor' => '#FF1493',
            'stampEmptyColor' => '#FFC0CB',
            'stampShape' => 'star',
            'footer' => 'Indulge in sweetness!',
            'valid_until' => Carbon::now()->addMonths(4),
        ]);

        // Create Perks for Loyalty Card 1
        $perk1_1 = Perk::create([
            'loyalty_card_id' => $loyaltyCard1->id,
            'stampNumber' => 5,
            'reward' => '50% Off Any Drink',
            'details' => 'Get 50% discount on your next beverage purchase',
            'color' => '#FFD700',
        ]);

        $perk1_2 = Perk::create([
            'loyalty_card_id' => $loyaltyCard1->id,
            'stampNumber' => 10,
            'reward' => 'Free Large Coffee',
            'details' => 'Redeem for one large coffee of your choice',
            'color' => '#32CD32',
        ]);

        // Create Perks for Loyalty Card 2
        $perk2_1 = Perk::create([
            'loyalty_card_id' => $loyaltyCard2->id,
            'stampNumber' => 4,
            'reward' => 'Free Cookie',
            'details' => 'Choose any cookie from our selection',
            'color' => '#FF6347',
        ]);

        $perk2_2 = Perk::create([
            'loyalty_card_id' => $loyaltyCard2->id,
            'stampNumber' => 8,
            'reward' => 'Free Cake Slice',
            'details' => 'Select any slice of cake from our display',
            'color' => '#9370DB',
        ]);

        // Create 30 Customers
        $customers = [];
        $customerNames = [
            'john_doe', 'jane_smith', 'mike_wilson', 'sarah_jones', 'david_brown',
            'emma_davis', 'chris_miller', 'lisa_garcia', 'kevin_martinez', 'amy_rodriguez',
            'tom_lopez', 'mary_gonzalez', 'james_hernandez', 'patricia_moore', 'robert_taylor',
            'jennifer_anderson', 'michael_thomas', 'linda_jackson', 'william_white', 'barbara_harris',
            'richard_martin', 'susan_thompson', 'joseph_lee', 'jessica_walker', 'thomas_hall',
            'nancy_allen', 'daniel_young', 'karen_king', 'paul_wright', 'customer'
        ];

        foreach ($customerNames as $index => $username) {
            $customer = Customer::create([
                'business_id' => $business->id,
                'username' => $username,
                'email' => $username . '@gmail.com',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]);
            $customers[] = $customer;

            // Give each customer random stamps (between 0-12 stamps to show variety)
            $stampsCount = rand(0, 12);
            
            // Randomly choose which loyalty card this customer uses
            $selectedCard = rand(0, 1) === 0 ? $loyaltyCard1 : $loyaltyCard2;
            $selectedPerks = $selectedCard->id === $loyaltyCard1->id 
                ? [$perk1_1, $perk1_2] 
                : [$perk2_1, $perk2_2];
            
            $stampCodes = [];
            for ($i = 0; $i < $stampsCount; $i++) {
                $code = $this->generateUniqueCode();
                
                $stampCode = StampCode::create([
                    'user_id' => 1,
                    'business_id' => $business->id,
                    'customer_id' => $customer->id,
                    'loyalty_card_id' => $selectedCard->id,
                    'code' => $code,
                    'used_at' => Carbon::now()->subDays(rand(1, 30))->subHours(rand(0, 23)),
                    'is_expired' => false,
                ]);
                
                $stampCodes[] = $stampCode;
            }

            // Create perk claims based on stamp count
            foreach ($selectedPerks as $perk) {
                if ($stampsCount >= $perk->stampNumber) {
                    $isRedeemed = rand(0, 2) === 0; // 33% chance of being redeemed
                    
                    PerkClaim::create([
                        'customer_id' => $customer->id,
                        'loyalty_card_id' => $selectedCard->id,
                        'perk_id' => $perk->id,
                        'stamps_at_claim' => $perk->stampNumber,
                        'is_redeemed' => $isRedeemed,
                        'redeemed_at' => $isRedeemed ? Carbon::now()->subDays(rand(1, 15)) : null,
                        'created_at' => Carbon::now()->subDays(rand(1, 25)),
                    ]);
                }
            }

            // If customer has completed a card (10+ stamps for card1, 8+ for card2)
            $stampsNeeded = $selectedCard->stampsNeeded;
            if ($stampsCount >= $stampsNeeded) {
                // Calculate how many complete cycles
                $completedCycles = intdiv($stampsCount, $stampsNeeded);
                
                for ($cycle = 1; $cycle <= $completedCycles; $cycle++) {
                    $stampsForThisCycle = $stampsNeeded;
                    $relevantStamps = array_slice($stampCodes, ($cycle - 1) * $stampsNeeded, $stampsNeeded);
                    
                    $stampsData = array_map(function ($stamp) {
                        return [
                            'id' => $stamp->id,
                            'code' => $stamp->code,
                            'used_at' => $stamp->used_at,
                        ];
                    }, $relevantStamps);

                    CompletedLoyaltyCard::create([
                        'customer_id' => $customer->id,
                        'loyalty_card_id' => $selectedCard->id,
                        'stamps_collected' => $stampsForThisCycle,
                        'completed_at' => Carbon::now()->subDays(rand(5, 40)),
                        'card_cycle' => $cycle,
                        'stamps_data' => json_encode($stampsData),
                    ]);
                }
                
                // Remove stamps that were used in completed cards, keep remainder
                $remainingStamps = $stampsCount % $stampsNeeded;
                if ($remainingStamps === 0 && $completedCycles > 0) {
                    // All stamps were used in completed cards
                    StampCode::where('customer_id', $customer->id)
                        ->where('loyalty_card_id', $selectedCard->id)
                        ->delete();
                } elseif ($completedCycles > 0) {
                    // Keep only the remaining stamps
                    $stampsToDelete = array_slice($stampCodes, 0, $completedCycles * $stampsNeeded);
                    $idsToDelete = array_map(fn($s) => $s->id, $stampsToDelete);
                    StampCode::whereIn('id', $idsToDelete)->delete();
                }
            }
        }

        // Create some unused/expired stamp codes for the business
        for ($i = 0; $i < 20; $i++) {
            $code = $this->generateUniqueCode();
            $selectedCard = rand(0, 1) === 0 ? $loyaltyCard1 : $loyaltyCard2;
            
            StampCode::create([
                'user_id' => 1,
                'business_id' => $business->id,
                'customer_id' => null,
                'loyalty_card_id' => $selectedCard->id,
                'code' => $code,
                'used_at' => null,
                'is_expired' => rand(0, 1) === 1, // 50% are expired
                'created_at' => Carbon::now()->subMinutes(rand(1, 500)),
            ]);
        }

        $this->command->info('✅ Database seeded successfully!');
        $this->command->info('📧 Business Email: business@example.com');
        $this->command->info('🔑 Business Password: password');
        $this->command->info('👥 Created 30 customers (username@example.com / password)');
        $this->command->info('🎫 Created 2 loyalty cards with perks');
        $this->command->info('📌 Generated stamp codes with perk claims');
        $this->command->info('🏆 Created completed loyalty card records');
    }

    /**
     * Generate a unique 8-character code
     */
    private function generateUniqueCode(): string
    {
        do {
            $code = strtoupper(Str::random(8));
        } while (StampCode::where('code', $code)->exists());

        return $code;
    }
}