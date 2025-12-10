<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Loyalty Program Stamp Tickets</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        @page {
            margin: 8mm;
        }
        
        body {
            font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
            font-size: 8pt;
            color: #1e293b;
            background: #ffffff;
        }
        
        .page-header {
            text-align: center;
            margin-bottom: 8px;
            padding-bottom: 6px;
            border-bottom: 3px solid #f59e0b;
            background: linear-gradient(135deg, #fef3c7 0%, #ffffff 100%);
            padding: 10px;
            border-radius: 6px;
        }
        
        .page-header h1 {
            font-size: 18pt;
            color: #0f172a;
            margin-bottom: 4px;
            font-weight: 700;
            letter-spacing: -0.5px;
        }
        
        .page-header .card-name {
            font-size: 10pt;
            color: #f59e0b;
            font-weight: 600;
            margin-bottom: 2px;
        }
        
        .page-header p {
            font-size: 7.5pt;
            color: #64748b;
            font-weight: 500;
        }
        
        .instructions {
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            border-radius: 6px;
            padding: 6px 10px;
            margin-bottom: 8px;
            font-size: 7pt;
            line-height: 1.4;
            border: 1px solid #e2e8f0;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }
        
        .instructions strong {
            color: #0f172a;
            font-weight: 700;
        }
        
        .tickets-container {
            display: table;
            width: 100%;
            border-collapse: separate;
            border-spacing: 3px;
        }
        
        .ticket-row {
            display: table-row;
        }
        
        .ticket {
            display: table-cell;
            width: 50%;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            padding: 6px;
            position: relative;
            page-break-inside: avoid;
            vertical-align: top;
            background: #ffffff;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
        }
        
        .ticket-header {
            text-align: center;
            margin-bottom: 8px;
            padding-bottom: 8px;
            border-bottom: 2px solid #f1f5f9;
        }
        
        .ticket-header h2 {
            font-size: 9pt;
            color: #0f172a;
            font-weight: 700;
            margin-bottom: 3px;
            letter-spacing: -0.3px;
        }
        
        .ticket-header .card-name-ticket {
            font-size: 7.5pt;
            color: #f59e0b;
            font-weight: 600;
            margin-bottom: 2px;
        }
        
        .ticket-header .business-name {
            font-size: 6.5pt;
            color: #94a3b8;
            font-weight: 500;
        }
        
        .ticket-content {
            display: table;
            width: 100%;
        }
        
        .left-section, .right-section {
            display: table-cell;
            vertical-align: middle;
        }
        
        .left-section {
            width: 48%;
            padding-right: 8px;
        }
        
        .right-section {
            width: 52%;
            padding-left: 8px;
            text-align: center;
            border-left: 2px solid #f1f5f9;
        }
        
        .code-label {
            font-size: 6pt;
            color: #64748b;
            text-transform: uppercase;
            font-weight: 700;
            letter-spacing: 0.8px;
            margin-bottom: 4px;
        }
        
        .code-box {
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
            border: 2px solid #f59e0b;
            border-radius: 8px;
            padding: 8px 6px;
            text-align: center;
        }
        
        .code-value {
            font-size: 13pt;
            font-weight: 800;
            color: #0f172a;
            letter-spacing: 2px;
            font-family: 'Courier New', monospace;
            word-break: break-all;
            line-height: 1.2;
        }
        
        .register-label {
            font-size: 6pt;
            color: #64748b;
            margin-bottom: 4px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.8px;
        }
        
        .qr-code {
            margin: 4px auto;
            background: #ffffff;
            border-radius: 8px;
            padding: 6px;
            display: inline-block;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .qr-code img {
            width: 55px;
            height: 55px;
            display: block;
            margin: 0 auto;
            border-radius: 4px;
        }
        
        .url-text {
            font-size: 5pt;
            color: #f59e0b;
            word-break: break-all;
            line-height: 1.2;
            margin-top: 3px;
            font-weight: 600;
        }
        
        .scissors {
            position: absolute;
            bottom: 4px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 8pt;
            color: #cbd5e1;
        }
        
        .cut-guide {
            font-size: 6.5pt;
            color: #94a3b8;
            text-align: center;
            margin-top: 8px;
            padding-top: 8px;
            border-top: 1px solid #e2e8f0;
            font-weight: 500;
        }
        
        .cut-guide strong {
            color: #64748b;
        }
    </style>
</head>
<body>
    <div class="page-header">
        <h1>{{ $businessName }}</h1>
        <div class="card-name">{{ $loyaltyCard->name }}</div>
        <p>Customer Loyalty Program Stamp Tickets</p>
    </div>
    
    <div class="instructions">
        <strong>Instructions:</strong> Cut along the borders to separate tickets. Distribute to customers. They can scan the QR code or enter the stamp code to register for your loyalty program and start earning rewards.
    </div>
    
    <div class="tickets-container">
        @foreach(array_chunk($tickets, 2) as $rowTickets)
        <div class="ticket-row">
            @foreach($rowTickets as $ticket)
            <div class="ticket">
                <div class="ticket-header">
                    <h2>Join & Earn Rewards</h2>
                    <div class="card-name-ticket">{{ $loyaltyCard->name }}</div>
                    <div class="business-name">{{ $businessName }}</div>
                </div>
                
                <div class="ticket-content">
                    <div class="left-section">
                        <div class="code-label">Your Stamp Code</div>
                        <div class="code-box">
                            <div class="code-value">{{ $ticket['code'] }}</div>
                        </div>
                    </div>
                    
                    <div class="right-section">
                        <div class="register-label">Scan to Register</div>
                        <div class="qr-code">
                            <img src="{{ $ticket['qr_code_base64'] }}" alt="QR Code">
                        </div>
                    </div>
                </div>
                
                <div class="scissors">✂</div>
            </div>
            @endforeach
            
            @if(count($rowTickets) == 1)
            <div class="ticket" style="border: none; box-shadow: none; background: transparent;"></div>
            @endif
        </div>
        @endforeach
    </div>
    
    <div class="cut-guide">
        <strong>{{ $loyaltyCard->name }}</strong> • Generated on {{ date('M d, Y') }}
    </div>
</body>
</html>